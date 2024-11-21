import css from "../../css/SelectRole.module.css";

import student from "../../assets/student.png";
import teacher from "../../assets/teacher.png";

export default function SelectRole({ register, setRegister, setRole }) {
  return (
    <div className={css.modal}>
      <div className={css.modalContent}>
        <div className={css.heading}>Create new account as:</div>
        <br />
        <div className={css.roleButtons}>
          <div
            className={css.individualRole}
            onClick={() => {
              setRegister({ ...register, role: "Student" });
              setRole(false);
            }}
          >
            <img src={student} alt="" />
            <div className={css.role}>Student</div>
          </div>
          <div
            className={css.individualRole}
            onClick={() => {
              setRegister({ ...register, role: "Teacher" });
              setRole(false);
            }}
          >
            <img src={teacher} alt="" />
            <div className={css.role}>Teacher</div>
          </div>
        </div>
      </div>
    </div>
  );
}
