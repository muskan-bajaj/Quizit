// import React from "react";

import css from "../css/Login.module.css";

export default function Login() {
  return (
    <div className={css.loginBox}>
      <div className={css.inputBox}>
        <div className={css.heading}>QuizIt Login</div>
        <input className={css.input} type="text" placeholder="Enter Email" />
        <input className={css.input} type="text" placeholder="Enter Password" />
        <span className={css.forgotPassword}>Forgot Password?</span>
        <div className={css.buttonDiv}>
          <button className={css.login}>Login</button>
        </div>
      </div>
    </div>
  );
}
