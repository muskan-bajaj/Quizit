// import React from "react";

import { useState } from "react";
import css from "../css/Login.module.css";

export default function Login() {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");
    if (login.email === "" || login.password === "") {
      setError("Fill all the required fields");
      return;
    }
    console.log(login);
  };

  return (
    <div className={css.loginBox}>
      <div className={css.inputBox}>
        <div className={css.heading}>QuizIt Login</div>
        <input
          className={css.input}
          type="text"
          placeholder="Enter Email*"
          value={login.email}
          onChange={(e) => {
            setLogin({ ...login, email: e.target.value });
          }}
        />
        <input
          className={css.input}
          type="text"
          placeholder="Enter Password*"
          value={login.password}
          onChange={(e) => {
            setLogin({ ...login, password: e.target.value });
          }}
        />
        {error && <div className="errorHandling">{error}</div>}
        <span className={css.forgotPassword}>Forgot Password?</span>
        <div className={css.buttonDiv}>
          <button className={css.login} onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
