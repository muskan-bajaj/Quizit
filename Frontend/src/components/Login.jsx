// import React from "react";

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AuthContext from "../store/AuthContext";

import css from "../css/Login.module.css";

export default function Login() {
  const authCtx = useContext(AuthContext);
  const redirect = useNavigate();

  const [login, setLogin] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    if (login.email === "" || login.password === "") {
      setError("Fill all the required fields");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        username: login.email,
        password: login.password,
      });
      authCtx.login(
        response.data.user.name,
        response.data.user.email,
        response.data.user.rollno,
        response.data.user.role
      );
      setError("");
      redirect("/profile");
    } catch (err) {
      setError(err.response.data.error);
    }
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
          type="password"
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
        <div className={css.register}>
          New User?{" "}
          <span
            onClick={() => {
              redirect("/signup");
            }}
          >
            Register Now.
          </span>
        </div>
      </div>
    </div>
  );
}
