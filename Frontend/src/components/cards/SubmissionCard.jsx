import css from "../../css/SubmissionCard.module.css";

export default function SubmissionCard({ index, data }) {
  return (
    <div className={css.submissionCard}>
      <div>{index + 1}.</div>
      <div>Muskan Bajaj</div>
      <div>21051228</div>
      <div>3</div>
      <div>27-09-10 12:00 PM</div>
      <div className={css.marks}>6/10</div>
    </div>
  );
}
