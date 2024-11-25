import { useNavigate } from "react-router-dom";
import css from "../../css/SubmissionCard.module.css";

export default function SubmissionCard({ index, data }) {
  const redirect = useNavigate();
  return (
    <div className={css.submissionCard}>
      <div>{index + 1}.</div>
      <div>{data.name}</div>
      <div>{data.rollno}</div>
      <div>{data.violation}</div>
      <div>{data.submittedAt}</div>
      <div
        className={css.marks}
        onClick={() => {
          redirect(`/submission/${data.tid}/${data.uid}`);
        }}
      >
        {data.marksObtained}/{data.totalMarks}
      </div>
    </div>
  );
}
