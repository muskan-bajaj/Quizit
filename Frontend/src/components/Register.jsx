import { useState } from "react";
import { useNavigate } from "react-router-dom";

import css from "../css/Register.module.css";
import axios from "axios";

export default function Register() {
  const redirect = useNavigate();

  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    rollno: "",
  });
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setError("");
    if (
      (register.name == "" ||
        register.rollno == "" ||
        register.email == "" ||
        register.password == "",
      register.confirmPassword == "")
    ) {
      setError("Please fill all the fields");
      return;
    }

    if (register.password !== register.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://localhost:3000/auth/register", {
        email: register.email,
        password: register.password,
        rollno: Number(register.rollno),
        name: register.name,
      });
      setError("");
      redirect("/");
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <div className={css.registerBox}>
      <div className={css.inputBox}>
        <div className={css.heading}>QuizIt Login</div>
        <input
          className={css.input}
          type="text"
          placeholder="* Enter your name"
          value={register.name}
          onChange={(e) => {
            setRegister({ ...register, name: e.target.value });
          }}
        />
        <input
          className={css.input}
          type="number"
          placeholder="* Enter your roll number"
          value={register.rollno}
          onChange={(e) => {
            setRegister({ ...register, rollno: e.target.value });
          }}
        />
        <input
          className={css.input}
          type="text"
          placeholder="* Enter your KIIT email"
          value={register.email}
          onChange={(e) => {
            setRegister({ ...register, email: e.target.value });
          }}
        />
        <input
          className={css.input}
          type="password"
          placeholder="* Enter your password"
          value={register.password}
          onChange={(e) => {
            setRegister({ ...register, password: e.target.value });
          }}
        />
        <input
          className={css.input}
          type="password"
          placeholder="* Re-enter your password"
          value={register.confirmPassword}
          onChange={(e) => {
            setRegister({ ...register, confirmPassword: e.target.value });
          }}
        />
        {error && <div className="errorHandling">{error}</div>}
        <div className={css.buttonDiv}>
          <button className={css.register} onClick={handleRegister}>
            Register
          </button>
        </div>
        <div className={css.login}>
          Existing User?{" "}
          <span
            onClick={() => {
              redirect("/");
            }}
          >
            Login Now.
          </span>
        </div>
      </div>
    </div>
  );
}
