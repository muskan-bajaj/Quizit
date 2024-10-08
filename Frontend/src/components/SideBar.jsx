// import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/AuthContext";

import logo from "../assets/KIITLogo.svg";
import profile from "../assets/profileIcon.svg";
import test from "../assets/testIcon.svg";
import result from "../assets/resultIcon.svg";
import logout from "../assets/logoutIcon.svg";
import settingsIcon from "../assets/settings.svg";

import css from "../css/SideBar.module.css";

export default function SideBar({ settings, setSettings }) {
  const redirect = useNavigate();
  const authCtx = useContext(AuthContext);

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
              settings
                ? { backgroundColor: "#ffffff" }
                : { backgroundColor: "#4b515b" }
            }
            onClick={() => {
              setSettings(!settings);
            }}
          >
            <img src={settingsIcon} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
