import { eq } from "drizzle-orm";
import { getDbInstance } from "../drizzle/db";
import * as schema from "../drizzle/schema";
const db = getDbInstance();
function roundHalf(num: number) {
  return Math.max(Math.ceil(num * 2) / 2, 0);
}
export const getMarksFromAI = async (submission: { sid: number }) => {
  try {
    var subObj = await db.query.submission.findFirst({
      where: eq(schema.submission.sid, submission.sid),
      with: {
        questionBank: true,
      },
    });
    var subDict = {
      teacher_answer: subObj?.questionBank.answer,
      student_answer: (subObj?.submittedAnswer as string[])[0],
    };

    var submit = await fetch(`${process.env.AI_BACKEND}/evaluate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subDict),
    });

    var analysis = await submit.json();
    var marks = 0;
    if (analysis.final_score >= 0.8) {
      marks = 1;
    } else if (analysis.final_score > 0.45) {
      marks = analysis.final_score / 0.35;
    }
    await db
      .update(schema.submission)
      .set({
        AiExplanation: analysis.analysis,
        marksObtained: roundHalf(marks * subObj!.questionBank.marksAwarded),
      })
      .where(eq(schema.submission.sid, submission.sid));
  } catch (error) {
    console.error("ai error:", error);
  }
};
