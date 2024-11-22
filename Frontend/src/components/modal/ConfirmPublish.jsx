import css from "../../css/ConfirmPublish.module.css";

export default function ConfirmPublish({ setPublish }) {
  return (
    <div className={css.modal}>
      <div className={css.modalContent}>
        <div className={css.heading}>
          Are you sure you want to publish this test?
        </div>
        <div className={css.instructions}></div>
        <div className={css.button}>
          <button
            style={{ backgroundColor: "red" }}
            onClick={() => {
              setPublish(false);
            }}
          >
            Cancel
          </button>
          <button onClick={() => {}}>Confirm</button>
        </div>
      </div>
    </div>
  );
}
