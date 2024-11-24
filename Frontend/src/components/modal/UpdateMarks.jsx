import { useState } from "react";
import css from "../../css/UpdateMarks.module.css";
import axios from "axios";

export default function UpdateMarks({ setModal, total, sid }) {
  const [updatedMarks, setUpdatedMarks] = useState("");
  const [error, setError] = useState("");

  const updateMarksHandler = async () => {
    if (updatedMarks > total) {
      setError("Invalid Marks");
      return;
    }
    const response = await axios.post(
      "http://localhost:3000/test/submission/edit",
      { sid: sid, newMarks: updatedMarks }
    );
    if (response.status === 200) {
      setModal(false);
      window.location.reload();
    } else {
      setError("Failed to update marks");
    }
  };

  return (
    <div className={css.modal}>
      <div className={css.modalContent}>
        <div className={css.heading}>Enter the updated marks:</div>
        <br />
        <div className={css.textbox}>
          <input
            className={css.input}
            type="number"
            value={updatedMarks}
            onChange={(e) => {
              setUpdatedMarks(e.target.value);
            }}
          />
        </div>
        {error && <div className={css.error}>{error}</div>}
        <div className={css.button}>
          <button
            style={{ backgroundColor: "red" }}
            onClick={() => {
              setModal(false);
            }}
          >
            Cancel
          </button>
          <button onClick={() => updateMarksHandler()}>Confirm</button>
        </div>
      </div>
    </div>
  );
}
