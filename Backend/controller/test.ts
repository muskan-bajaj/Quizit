import { Request, Response, NextFunction } from "express";
import * as types from "./interface/test";
import * as schema from "../drizzle/schema";
import { getDbInstance } from "../drizzle/db";
import { inArray, and, eq, sql, lt, notExists, or, SQL } from "drizzle-orm";
import { report } from "process";
import moment from "moment";
import { CustomLogger } from "../logger";
import {
  DataAleadryExistsException,
  InvalidDataException,
  InvalidUserException,
} from "../customException";
import { getMarksFromAI } from "../utils/getMarksFromAI";
import { Mailer } from "../utils/mailer";

const logger = new CustomLogger();
const mailer = Mailer.getInstance();
const db = getDbInstance();
function roundHalf(num: number) {
  return Math.ceil(num * 2) / 2;
}

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

function groupIntoReports(tests: any[]) {
  const today = moment(); // Get today's date

  return tests.reduce<{
    published: typeof tests;
    pending: typeof tests;
  }>(
    (acc, item) => {
      const endDate = moment(item.end);
      if (!item.reportPublished) {
        acc.pending.push(item); // Add to "past" group
      } else {
        acc.published.push(item); // Add to "future" group
      }
      return acc;
    },
    { pending: [], published: [] } // Initialize groups
  );
}

export async function createTest(
  req: Request,
  res: Response,
  next: NextFunction
) {
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
  const db_roll_set = new Set(student_list_db.map((student) => student.rollno));
  const student_missing: Array<number> = [];
  student_list.forEach((rollno) => {
    if (!db_roll_set.has(rollno)) {
      student_missing.push(rollno);
    }
  });
  if (student_missing.length !== 0) {
    return next(
      new InvalidDataException(
        `Students with rollno ${student_missing.join(",")} not found`
      )
    );
  }
  if (rawData.questions.length < rawData.setting.question_count) {
    next(
      new InvalidDataException(
        "Question count is less than the number of questions provided"
      )
    );
    return;
  }
  // Raw Data into db
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
        navigation: false,
        createdBy: req.locals.user.uid,
      })
      .returning();

    var questions = await trx
      .insert(schema.questionBank)
      .values(
        rawData.questions.map((question, index) => {
          return {
            question: question.question,
            type: question.type,
            answer: question.type == "long" ? question.answer![0] : null,
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
        var answers = rawData.questions[question.order - 1].answer;
        if (rawData.questions[question.order - 1].type === "choice") {
          return rawData.questions[question.order - 1].options?.map(
            (option) => {
              return {
                option: option,
                correct: answers!.some((e: any) => e == option),
                qid: question.qid,
              };
            }
          );
        }
      })
      .filter((option) => option)
      .flat();

    var options =
      optionData.length !== 0 &&
      (await trx
        .insert(schema.option)
        .values(
          optionData as { qid: number; option: string; correct: boolean }[]
        ));

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

    //send mail to student
    var roll_list: number[] = student_list_db.map((student) => student.rollno);
    mailer.sendToRoll(roll_list, "New Test", "A new test has been created");
  });
  res.sendStatus(200);
}

export async function getTest(req: Request, res: Response, next: NextFunction) {
  if (req.locals.user.role === "Teacher") {
    const tests = await db.query.test.findMany({
      where: eq(schema.test.createdBy, req.locals.user.uid),
      with: {
        subject: true,
        user: {
          columns: {
            name: true,
            username: true,
          },
        },
      },
    });

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
}

export async function getTestDetails(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.query.tid) {
      return next(new InvalidDataException("Test ID is required"));
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
      return next(new InvalidDataException("Test not found"));
    }

    const submissions = await db.query.submission.findMany({
      where: eq(schema.submission.tmid, testManager.tmid),
    });

    const shuffled = testManager.test.questionBanks
      .sort(() => 0.5 - Math.random())
      .slice(0, testManager.test.questionCount - submissions.length);

    var data = {
      ...testManager.test,
      questionBanks: shuffled,
    };

    //process the data
    var deepcopy = JSON.parse(JSON.stringify(data));
    deepcopy.questionBanks.map((question: { type: string; options: any[] }) => {
      if (question.type === "choice") {
        question.options = question.options.map((option) => {
          return option.option;
        });
      }
    });

    res.json(deepcopy);
  } catch (error: any) {
    logger.error(error);
    res.status(500).json(error.message);
  }
}

export async function startTest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const testManager = await db.query.testManager.findFirst({
    where: and(
      eq(schema.testManager.uid, req.locals.user.uid),
      eq(schema.testManager.tid, req.body.tid)
    ),
  });

  if (!testManager) {
    return next(new InvalidUserException());
  }

  if (testManager.startedAt) {
    return next(new DataAleadryExistsException("Test already started"));
  }

  var updated = await db
    .update(schema.testManager)
    .set({
      startedAt: moment().format(),
    })
    .where(eq(schema.testManager.tmid, testManager.tmid));

  res.sendStatus(200);
}

export async function endTest(req: Request, res: Response, next: NextFunction) {
  const testManager = await db.query.testManager.findFirst({
    where: and(
      eq(schema.testManager.uid, req.locals.user.uid),
      eq(schema.testManager.tid, req.body.tid)
    ),
  });

  if (!testManager) {
    return next(new InvalidUserException());
  }

  if (testManager.endedAt) {
    return next(new DataAleadryExistsException("Test already ended"));
  }

  var updated = await db
    .update(schema.testManager)
    .set({
      endedAt: moment().format(),
    })
    .where(eq(schema.testManager.tmid, testManager.tmid));

  res.sendStatus(200);
}

export async function submitQuestion(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const testManager = await db.query.testManager.findFirst({
    where: and(
      eq(schema.testManager.uid, req.locals.user.uid),
      eq(schema.testManager.tid, req.body.tid)
    ),
    with: {
      test: true,
    },
  });

  const question = await db.query.questionBank.findFirst({
    where: eq(schema.questionBank.qid, req.body.qid),
    with: {
      options: true,
    },
  });
  if (!(question && testManager && !testManager.endedAt)) {
    return next(new InvalidDataException("Question not found"));
  }

  if (question.type === "choice") {
    var correctAns = 0;
    var correctOptions = 0;
    question.options.every((option) => {
      if (option.correct) {
        if (req.body.answer.some((e: any) => e == option.option)) {
          correctAns += 1;
        }
        correctOptions += 1;
      }
      return true;
    });
    const numberAnsweredButWrong = req.body.answer.length - correctAns;
    const markAwarded = roundHalf(
      ((correctAns - numberAnsweredButWrong / 3) / correctOptions) *
        question.marksAwarded
    );

    await db
      .insert(schema.submission)
      .values({
        qid: question.qid,
        tmid: testManager.tmid,
        marksObtained: markAwarded,
        submittedAt: moment().format(),
      })
      .onConflictDoUpdate({
        target: [schema.submission.qid, schema.submission.tmid],
        set: {
          marksObtained: markAwarded,
          submittedAt: moment().format(),
        },
      });
  } else {
    var [marksObtained, explanation] = getMarksFromAI(req.body);
    await db
      .insert(schema.submission)
      .values({
        qid: question.qid,
        tmid: testManager.tmid,
        marksObtained: marksObtained as number,
        submittedAt: moment().format(),
      })
      .onConflictDoUpdate({
        target: [schema.submission.qid, schema.submission.tmid],
        set: {
          marksObtained: marksObtained as number,
          submittedAt: moment().format(),
        },
      });
  }
  res.sendStatus(200);
}

export async function getTestReport(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const testManager = await db.query.testManager.findFirst({
    where: and(
      eq(schema.testManager.uid, req.locals.user.uid),
      eq(schema.testManager.tid, Number(req.query.tid))
    ),
    with: {
      test: true,
    },
  });

  if (!testManager) {
    return next(new InvalidDataException("Test not found"));
  }

  const submissions = await db.query.submission.findMany({
    where: eq(schema.submission.tmid, testManager.tmid),
    columns: {
      marksObtained: true,
      submittedAt: true,
    },
    with: {
      questionBank: {
        columns: {
          question: true,
          answer: true,
          type: true,
          marksAwarded: true,
          AiExplanation: true,
        },
      },
    },
  });

  //process data
  const report = submissions.map((submission) => {
    return {
      ...submission,
      ...submission.questionBank,
      questionBank: undefined,
    };
  });

  const totalMarks = report.reduce((acc, item) => {
    return acc + item.marksAwarded;
  }, 0);

  const totalMarksObtained = report.reduce((acc, item) => {
    return acc + (item.marksObtained ?? 0);
  }, 0);

  res.json({
    test: { totalMarksObtained, totalMarks, ...testManager.test },
    submission: [...report],
  });
}

export async function getTestReportList(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.locals.user.role === "Teacher") {
    const tests = await db.query.test.findMany({
      where: eq(schema.test.createdBy, req.locals.user.uid),
      with: {
        subject: true,
        user: {
          columns: {
            name: true,
            username: true,
          },
        },
      },
    });

    const groupedData = groupIntoReports(tests);
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

  res.json(groupIntoReports(testsRes));
}
