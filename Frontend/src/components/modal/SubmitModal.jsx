import { useNavigate } from "react-router-dom";

import css from "../../css/SubmitModal.module.css";

import success from "../../assets/successfulSubmission.gif";

export default function SubmitModal({ setExamStarted }) {
  const redirect = useNavigate();
  return (
    <div className={css.modal}>
      <div className={css.modalContent}>
        <img src={success} alt="Submission Successful" />
        <br />
        <div className={css.heading}>Test Submitted Successfully !!</div>
        <br />
        <div className={css.button}>
          <button
            onClick={() => {
              setExamStarted.exit();
              redirect("/assessment");
            }}
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}
