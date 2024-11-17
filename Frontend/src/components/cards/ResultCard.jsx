import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/AuthContext";

import css from "../../css/ResultCard.module.css";

export default function ResultCard({ data, declared }) {
  const redirect = useNavigate();
  const authCtx = useContext(AuthContext);
  return (
    <div className={css.resultCard}>
      <div className={css.name}>{data.name}</div>
      <div className={css.questions}>{data.questions} Questions</div>
      <div className={css.date}>{data.date}</div>
      <div className={css.time}>
        {data.time} ({data.duration})
      </div>
      <div className={css.course}>{data.course}</div>
      <div className={css.semester}>{data.semester}th Semester</div>
      <div className={css.studentButton}>
        {declared ? (
          <>
            <button className={css.score}>
              {data.score}/{data.total}
            </button>
            <button
              className={css.report}
              onClick={() => {
                if (authCtx.user.access == "Student") {
                  redirect(`/result/1`);
                } else {
                  redirect(`/submission/31`);
                }
              }}
            >
              Show Report
            </button>
          </>
        ) : (
          <button className={css.pending}>Pending</button>
        )}
      </div>
    </div>
  );
}
