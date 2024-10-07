import { useState } from "react";

import SideBar from "./SideBar";
import arrow from "../assets/arrow.svg";
import arrowUp from "../assets/arrowUp.svg";

import css from "../css/Assessment.module.css";
import AssessmentCard from "./cards/AssessmentCard";

export default function Assessment() {
  const [upcomingView, setUpcomingView] = useState(true);
  const [closedView, setClosedView] = useState(true);
  const [upcomingData, setUpcomingData] = useState([
    {
      name: "DSA Quiz 1",
      questions: "10",
      date: "28 Aug 2024",
      time: "12:00 AM",
      duration: "45 minutes",
      course: "DSA - CS2001",
      semester: "4",
    },
    {
      name: "DSA Quiz 1",
      questions: "10",
      date: "28 Aug 2024",
      time: "12:00 AM",
      duration: "45 minutes",
      course: "DSA - CS2001",
      semester: "4",
    },
    {
      name: "DSA Quiz 1",
      questions: "10",
      date: "28 Aug 2024",
      time: "12:00 AM",
      duration: "45 minutes",
      course: "DSA - CS2001",
      semester: "4",
    },
    {
      name: "DSA Quiz 1",
      questions: "10",
      date: "28 Aug 2024",
      time: "12:00 AM",
      duration: "45 minutes",
      course: "DSA - CS2001",
      semester: "4",
    },
  ]);
  const [closedData, setClosedData] = useState([
    {
      name: "DSA Quiz 1",
      questions: "10",
      date: "28 Aug 2024",
      time: "12:00 AM",
      duration: "45 minutes",
      course: "DSA - CS2001",
      semester: "4",
    },
    {
      name: "DSA Quiz 1",
      questions: "10",
      date: "28 Aug 2024",
      time: "12:00 AM",
      duration: "45 minutes",
      course: "DSA - CS2001",
      semester: "4",
    },
    {
      name: "DSA Quiz 1",
      questions: "10",
      date: "28 Aug 2024",
      time: "12:00 AM",
      duration: "45 minutes",
      course: "DSA - CS2001",
      semester: "4",
    },
    {
      name: "DSA Quiz 1",
      questions: "10",
      date: "28 Aug 2024",
      time: "12:00 AM",
      duration: "45 minutes",
      course: "DSA - CS2001",
      semester: "4",
    },
  ]);

  return (
    <div className="flexpage">
      <SideBar />
      <div className={css.assessmentScreen}>
        <div className={css.heading}>Assessments</div>
        <div className={css.upcoming}>
          <div className={css.sectionHeading}>
            <div className={css.text}>Upcoming</div>
            <div className={css.line}>
              <hr />
            </div>
            <div className={css.dropdownArrow}>
              <img
                src={upcomingView ? arrow : arrowUp}
                onClick={() => {
                  setUpcomingView(!upcomingView);
                }}
              />
            </div>
          </div>
          {upcomingView && (
            <div className={css.sectionDetails}>
              {upcomingData.map((data, key) => {
                return <AssessmentCard key={key} data={data} closed={false} />;
              })}
            </div>
          )}
        </div>
        <div className={css.closed}>
          <div className={css.sectionHeading}>
            <div className={css.text}>Closed</div>
            <div className={css.line}>
              <hr />
            </div>
            <div className={css.dropdownArrow}>
              <img
                src={closedView ? arrow : arrowUp}
                onClick={() => {
                  setClosedView(!closedView);
                }}
              />
            </div>
          </div>
          {closedView && (
            <div className={css.sectionDetails}>
              {closedData.map((data, key) => {
                return <AssessmentCard key={key} data={data} closed={true} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
