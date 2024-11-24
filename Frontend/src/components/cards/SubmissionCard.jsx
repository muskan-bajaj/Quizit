import { useNavigate } from "react-router-dom";
import css from "../../css/SubmissionCard.module.css";

export default function SubmissionCard({ index, data }) {
  const redirect = useNavigate();
  return (
    <div className={css.submissionCard}>
      <div>{index + 1}.</div>
      <div>{data.name}</div>
      <div>21051228</div>
      <div>{data.violation}</div>
      <div>27-09-10 12:00 PM</div>
      <div
        className={css.marks}
        onClick={() => {
          redirect(`/submission/${data.tid}/${data.uid}`);
        }}
      >
        6/10
      </div>
    </div>
  );
}
