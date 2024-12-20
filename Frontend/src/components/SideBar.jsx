// import React from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../store/AuthContext";

import logo from "../assets/KIITLogo.svg";
import profile from "../assets/profileIcon.svg";
import test from "../assets/testIcon.svg";
import result from "../assets/resultIcon.svg";
import logout from "../assets/logoutIcon.svg";
import plusBlack from "../assets/plusBlack.svg";
import settingsIcon from "../assets/settings.svg";
import publishIcon from "../assets/publishIcon.svg";
import backIcon from "../assets/backArrow.svg";

import css from "../css/SideBar.module.css";
import ConfirmPublish from "./modal/ConfirmPublish";
import { toast } from "react-toastify";

export default function SideBar({
  selected,
  setSelected,
  questionData,
  setQuestionData,
  settingsData,
  setSettingsData,
  options,
  setOptions,
  checked,
  setChecked,
}) {
  const redirect = useNavigate();
  const authCtx = useContext(AuthContext);
  const [publish, setPublish] = useState(false);

  const submitTest = async () => {
    console.log(settingsData);
    const response = await axios.post("http://localhost:3000/test/create", {
      setting: {
        ...settingsData,
        student_list: settingsData.student_list.split(","),
        question_count: settingsData.totalQuestions,
      },
      questions: questionData,
    });
    if (response.status == 200) {
      toast.success("Test Created Successfully");
      redirect("/assessment");
    }
  };

  return (
    <>
      <div className={css.sidebar}>
        <div className={logo}>
          <img src={logo} />
        </div>
        <div
          className={css.navItems}
          style={
            window.location.pathname === "/profile"
              ? { backgroundColor: "#ffffff" }
              : { backgroundColor: "#4b515b" }
          }
          onClick={() => {
            redirect("/profile");
          }}
        >
          <img src={profile} />
        </div>
        <div
          className={css.navItems}
          style={
            window.location.pathname === "/assessment"
              ? { backgroundColor: "#ffffff" }
              : { backgroundColor: "#4b515b" }
          }
          onClick={() => {
            redirect("/assessment");
          }}
        >
          <img src={test} />
        </div>
        <div
          className={css.navItems}
          style={
            window.location.pathname === "/results"
              ? { backgroundColor: "#ffffff" }
              : { backgroundColor: "#4b515b" }
          }
          onClick={() => {
            redirect("/results");
          }}
        >
          <img src={result} />
        </div>
        {window.location.pathname.match(/^\/result\/(\d+)$/) ? (
          <div
            className={css.navItems}
            id={css.hover}
            onClick={() => {
              redirect("/results");
            }}
          >
            <img src={backIcon} />
          </div>
        ) : (
          <></>
        )}

        <div
          className={css.navItems}
          onClick={() => {
            authCtx.logout();
            redirect("/");
          }}
        >
          <img src={logout} />
        </div>
      </div>
      {window.location.pathname == "/createTest" ? (
        <div className={css.sidebar}>
          <div
            className={css.navItems}
            style={
              selected == 0
                ? { backgroundColor: "#ffffff" }
                : { backgroundColor: "#4b515b" }
            }
            onClick={() => {
              setSelected(0);
            }}
          >
            <img src={settingsIcon} />
          </div>
          {Array.from({ length: questionData.length }, (_, index) => index).map(
            (key, index) => {
              return (
                <div
                  key={key}
                  className={css.navItems}
                  style={
                    selected == index + 1
                      ? { backgroundColor: "#ffffff" }
                      : { backgroundColor: "#4b515b" }
                  }
                  onClick={() => {
                    setSelected(index + 1);
                  }}
                >
                  <span className={css.numbers}>{index + 1}</span>
                </div>
              );
            }
          )}
          <div
            className={css.navItems}
            style={{ backgroundColor: "#4b515b" }}
            onClick={() => {
              // setTotalQuestions(totalQuestions + 1);
              setQuestionData([
                ...questionData,
                {
                  marks_awarded: "",
                  question: "",
                  type: "long",
                  answer: "",
                  options: [],
                },
              ]);
              setOptions((prevOptions) => [...prevOptions, 1]);
              setChecked((prevChecked) => [...prevChecked, [false]]);
            }}
          >
            <img src={plusBlack} />
          </div>
          <div
            className={css.navItems}
            style={{ backgroundColor: "#03C988" }}
            onClick={() => {
              setPublish(true);
            }}
          >
            <img src={publishIcon} />
          </div>
        </div>
      ) : (
        <></>
      )}
      {publish && (
        <ConfirmPublish setPublish={setPublish} callback={submitTest} />
      )}
    </>
  );
}
