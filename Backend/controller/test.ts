import e, { Request, Response } from "express";
import * as types from "./interface/test";
import * as schema from "../drizzle/schema";
import { getDbInstance } from "../drizzle/db";
import { inArray, and, eq, sql, lt, notExists, or, SQL } from "drizzle-orm";
import { report } from "process";
import moment from "moment-timezone";
import { object } from "zod";

const db = getDbInstance();
moment.tz.setDefault("Asia/Kolkata");

function groupIntoOpenClosed(tests: any[]) {
  const today = moment(); // Get today's date

  return tests.reduce<{
    closed: typeof tests;
    open: typeof tests;
  }>(
    (acc, item) => {
      const endDate = moment(item.end);
      if (endDate.date() < today.date()) {
        acc.closed.push(item); // Add to "past" group
      } else {
        acc.open.push(item); // Add to "future" group
      }
      return acc;
    },
    { closed: [], open: [] } // Initialize groups
  );
}

export async function createTest(req: Request, res: Response) {
  try {
    if (!req.locals.user) {
      throw { code: 401, message: "Unauthorized" };
    }
    const rawData: types.QuizRequestBody = req.body;

    const student_list = rawData.setting.student_list;
    const student_list_db = await db
      .select({ uid: schema.user.uid, rollno: schema.user.rollno })
      .from(schema.user)
      .where(
        and(
          inArray(schema.user.rollno, student_list),
          eq(schema.user.role, "Student")
        )
      );
    const db_roll_set = new Set(
      student_list_db.map((student) => student.rollno)
    );
    const student_missing: Array<number> = [];
    student_list.forEach((rollno) => {
      if (!db_roll_set.has(rollno)) {
        student_missing.push(rollno);
      }
    });
    if (student_missing.length !== 0) {
      throw {
        code: 400,
        message: { error: "Students not found", missing: student_missing },
      };
    }
    // Raw Data into db
    console.log(moment(rawData.setting.start_time).format());
    await db.transaction(async (trx) => {
      var test = await trx
        .insert(schema.test)
        .values({
          name: rawData.setting.name,
          semester: rawData.setting.semester,
          subjectId: rawData.setting.subject,
          violationCount: rawData.setting.violation_count,
          questionCount: rawData.setting.question_count,
          instructions: rawData.setting.instructions,
          start: moment(rawData.setting.start_time).format(),
          end: moment(rawData.setting.end_time).format(),
          suffle: rawData.setting.shuffle_questions,
          proctoring: rawData.setting.proctoring,
          navigation: rawData.setting.allow_navigation,
          createdBy: req.locals.user.uid,
        })
        .returning();

      var questions = await trx
        .insert(schema.questionBank)
        .values(
          rawData.questions.map((question, index) => {
            return {
              question: question.question,
              answer: question.answer,
              type: question.type,
              marksAwarded: question.marks_awarded,
              tid: test[0].tid,
              order: index + 1, // Adding the order property
            };
          })
        )
        .returning({
          qid: schema.questionBank.qid,
          order: schema.questionBank.order,
        });

      var optionData = questions
        .map((question, index) => {
          if (rawData.questions[question.order - 1].type === "choice") {
            return rawData.questions[question.order - 1].options?.map(
              (option) => {
                return {
                  option: option.option,
                  correct: option.correct,
                  qid: question.qid,
                };
              }
            );
          }
        })
        .filter((option) => option)
        .flat();

      var options = await trx
        .insert(schema.option)
        .values(
          optionData.filter(
            (option): option is NonNullable<typeof option> =>
              option !== undefined
          )
        );

      //mapp test to student
      var mappingData = student_list_db.map((student) => {
        return {
          tid: test[0].tid,
          uid: student.uid,
        };
      });

      var mapping = await trx
        .insert(schema.testManager)
        .values(mappingData)
        .returning();
    });
    res.sendStatus(200);
  } catch (err: any) {
    console.log(err);
    res.status(500).json(err.message);
  }
}

export async function getTest(req: Request, res: Response) {
  try {
    if (!req.locals.user) {
      throw { code: 401, message: "Unauthorized" };
    }

    if (req.locals.user.role === "Teacher") {
      const tests = await db
        .select()
        .from(schema.test)
        .where(eq(schema.test.createdBy, req.locals.user.uid));

      const groupedData = groupIntoOpenClosed(tests);
      res.json(groupedData);
      return;
    }

    const tests = await db.query.testManager.findMany({
      columns: {},
      where: eq(schema.testManager.uid, req.locals.user.uid),
      with: {
        test: {
          with: {
            subject: true,
            user: {
              columns: {
                name: true,
                username: true,
              },
            },
          },
        },
      },
    });

    var testsFinal = tests.map((test) => test.test);
    var testsRes = testsFinal.map((test) => {
      return {
        ...test,
        createdBy: test.user,
        subjectId: undefined,
        user: undefined,
      };
    });

    res.json(groupIntoOpenClosed(testsRes));
  } catch (error: any) {
    console.log(error);
    res.status(error.code).json(error.message);
  }
}

export async function getTestDetails(req: Request, res: Response) {
  try {
    if (!req.locals.user) {
      throw { code: 401, message: "Unauthorized" };
    }
    if (!req.query.tid) {
      throw { code: 400, message: "Test Id is required" };
    }

    if (req.locals.user.role === "Teacher") {
      const test = await db.query.test.findFirst({
        where: and(
          eq(schema.test.createdBy, req.locals.user.uid),
          eq(schema.test.tid, Number(req.query.tid))
        ),
        with: {
          questionBanks: {
            columns: {
              qid: true,
              question: true,
              answer: true,
              type: true,
              marksAwarded: true,
              order: true,
            },
            with: {
              options: {
                columns: {
                  option: true,
                  correct: true,
                  oid: true,
                },
              },
            },
          },
        },
      });
      res.json(test);
      return;
    }

    const testManager = await db.query.testManager.findFirst({
      where: and(
        eq(schema.testManager.uid, req.locals.user.uid),
        eq(schema.testManager.tid, Number(req.query.tid))
      ),
      with: {
        test: {
          with: {
            questionBanks: {
              columns: {
                qid: true,
                question: true,
                answer: true,
                type: true,
                marksAwarded: true,
                order: true,
              },
              with: {
                options: {
                  columns: {
                    option: true,
                    correct: true,
                    oid: true,
                  },
                },
              },
              where: (qb): SQL | undefined =>
                or(
                  notExists(
                    db
                      .select()
                      .from(schema.submission)
                      .where(
                        and(
                          eq(schema.submission.qid, qb.qid),
                          eq(schema.submission.tmid, schema.testManager.tmid)
                        )
                      )
                  )
                ),
            },
          },
        },
      },
    });

    if (!testManager) {
      throw { code: 404, message: "Test not found" };
    }

    const submissions = await db.query.submission.findMany({
      where: eq(schema.submission.tmid, testManager.tmid),
    });

    const shuffled = testManager.test.questionBanks
      .sort(() => 0.5 - Math.random())
      .slice(0, testManager.test.questionCount - submissions.length);

    res.json({
      ...testManager.test,
      questionBanks: shuffled,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error.message);
  }
}

export async function startTest(req: Request, res: Response) {}
