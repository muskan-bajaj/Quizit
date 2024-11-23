import { useContext } from "react";

import SideBar from "./SideBar";
import AuthContext from "../store/AuthContext";

import css from "../css/Profile.module.css";

export default function Profile() {
  const authCtx = useContext(AuthContext);

  return (
    <div className="flexpage">
      <SideBar />
      <div className={css.ProfileBox}>
        <div className={css.heading}>Welcome {authCtx.user.access}</div>
        <br />
        <div className={css.details}>
          {authCtx.user.access} Details:
          <br />
          <br />
          &nbsp;&nbsp;&nbsp;<span>Email: {authCtx.user.email}</span>
          <br />
          &nbsp;&nbsp;&nbsp;
          <span>
            {authCtx.user.access == "Student" ? "Roll No:" : "Faculty ID:"}{" "}
            {authCtx.user.rollNo}
          </span>
          <br />
          &nbsp;&nbsp;&nbsp;<span>Name: {authCtx.user.name}</span>
        </div>
      </div>
    </div>
  );
}
