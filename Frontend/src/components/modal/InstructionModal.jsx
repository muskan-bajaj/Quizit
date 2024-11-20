import css from "../../css/InstructionModal.module.css";

export default function InstructionModal({
  instructions,
  setViewInstructionModal,
}) {
  return (
    <div className={css.modal}>
      <div className={css.modalContent}>
        <div className={css.heading}>
          Kindly read the following instructions carefully before proceeding:
        </div>
        <br />
        <div className={css.instructions}>{instructions}</div>
        <br />
        <div className={css.button}>
          <button
            onClick={() => {
              setViewInstructionModal(false);
            }}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}
