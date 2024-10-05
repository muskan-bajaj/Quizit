import { useState } from "react";

import SideBar from "./SideBar";
import arrow from "../assets/arrow.svg";
import arrowUp from "../assets/arrowUp.svg";
import ResultCard from "./cards/ResultCard";

import css from "../css/Result.module.css";

export default function Result() {
  const [declaredView, setDeclaredView] = useState(true);
  const [pendingView, setPendingView] = useState(true);
  const [declaredData, setDeclaredData] = useState([
    {
      name: "DSA Quiz 1",
      questions: "10",
      date: "28 Aug 2024",
      time: "12:00 AM",
      duration: "45 minutes",
      course: "DSA - CS2001",
      semester: "4",
      score: "8",
      total: "10",
    },
    {
      name: "DSA Quiz 1",
      questions: "10",
      date: "28 Aug 2024",
      time: "12:00 AM",
      duration: "45 minutes",
      course: "DSA - CS2001",
      semester: "4",
      score: "8",
      total: "10",
    },
    {
      name: "DSA Quiz 1",
      questions: "10",
      date: "28 Aug 2024",
      time: "12:00 AM",
      duration: "45 minutes",
      course: "DSA - CS2001",
      semester: "4",
      score: "8",
      total: "10",
    },
    {
      name: "DSA Quiz 1",
      questions: "10",
      date: "28 Aug 2024",
      time: "12:00 AM",
      duration: "45 minutes",
      course: "DSA - CS2001",
      semester: "4",
      score: "8",
      total: "10",
    },
  ]);

  return (
    <div className="flexpage">
      <SideBar />
      <div className={css.resultScreen}>
        <div className={css.heading}>Report Analysis</div>
        <div className={css.upcoming}>
          <div className={css.sectionHeading}>
            <div className={css.text}>Declared Results</div>
            <div className={css.line}>
              <hr />
            </div>
            <div className={css.dropdownArrow}>
              <img
                src={declaredView ? arrow : arrowUp}
                onClick={() => {
                  setDeclaredView(!declaredView);
                }}
              />
            </div>
          </div>
          {declaredView && (
            <div className={css.sectionDetails}>
              {declaredData.map((data, key) => {
                return <ResultCard key={key} data={data} />;
              })}
            </div>
          )}
        </div>
        <div className={css.pending}>
          <div className={css.sectionHeading}>
            <div className={css.text}>Undeclared Result</div>
            <div className={css.line}>
              <hr />
            </div>
            <div className={css.dropdownArrow}>
              <img
                src={pendingView ? arrow : arrowUp}
                onClick={() => {
                  setPendingView(!pendingView);
                }}
              />
            </div>
          </div>
          {pendingView && (
            <div className={css.sectionDetails}>
              {declaredData.map((data, key) => {
                return <ResultCard key={key} data={data} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
