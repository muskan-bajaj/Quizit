import { useContext } from "react";
import AuthContext from "../../store/AuthContext";

import css from "../../css/AssessmentCard.module.css";

export default function AssessmentCard({ data, closed }) {
  const authCtx = useContext(AuthContext);
  return (
    <div className={css.assessmentCard}>
      <div className={css.name}>{data.name}</div>
      <div className={css.questions}>{data.questions} Questions</div>
      <div className={css.date}>{data.date}</div>
      <div className={css.time}>
        {data.time} ({data.duration})
      </div>
      <div className={css.course}>{data.course}</div>
      <div className={css.semester}>{data.semester}th Semester</div>
      <div className={css.buttons}>
        {!closed ? (
          authCtx.user.access == "Student" ? (
            <button>Start</button>
          ) : (
            <button>Edit</button>
          )
        ) : authCtx.user.access == "Student" ? (
          <button
            style={{ backgroundColor: "transparent", cursor: "not-allowed" }}
          >
            Test Closed
          </button>
        ) : (
          <button style={{ backgroundColor: "#03C988" }}>Evaluate</button>
        )}
      </div>
    </div>
  );
}
