// import React from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/AuthContext";

import logo from "../assets/KIITLogo.svg";
import profile from "../assets/profileIcon.svg";
import test from "../assets/testIcon.svg";
import result from "../assets/resultIcon.svg";
import logout from "../assets/logoutIcon.svg";
import plusBlack from "../assets/plusBlack.svg";
import settingsIcon from "../assets/settings.svg";
import publishIcon from "../assets/publishIcon.svg";

import css from "../css/SideBar.module.css";

export default function SideBar({
  data,
  selected,
  setSelected,
  totalQuestions,
  setTotalQuestions,
}) {
  const redirect = useNavigate();
  const authCtx = useContext(AuthContext);

  // const handleClick = (key) => {
  //   setStates((prevStates) => {
  //     if (prevStates[key]) return prevStates;
  //     // Create a new state object with the clicked key set to true and others to false
  //     return Object.keys(prevStates).reduce((acc, stateKey) => {
  //       acc[stateKey] = stateKey === key; // set the clicked key to true, others to false
  //       return acc;
  //     }, {});
  //   });
  // };

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
          {Array.from({ length: totalQuestions - 1 }, (_, index) => index).map(
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
              setTotalQuestions(totalQuestions + 1);
            }}
          >
            <img src={plusBlack} />
          </div>
          <div
            className={css.navItems}
            style={{ backgroundColor: "#03C988" }}
            onClick={() => {
              confirm("Do you want to publish the test?");
              console.log(data);
              redirect("/assessment");
            }}
          >
            <img src={publishIcon} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
