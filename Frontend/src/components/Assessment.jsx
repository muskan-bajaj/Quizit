import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/AuthContext";

import SideBar from "./SideBar";
import AssessmentCard from "./cards/AssessmentCard";

import arrow from "../assets/arrow.svg";
import arrowUp from "../assets/arrowUp.svg";
import plus from "../assets/plus.svg";

import css from "../css/Assessment.module.css";

export default function Assessment() {
  const authCtx = useContext(AuthContext);
  const redirect = useNavigate();

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
              {authCtx.user.access == "Teacher" ? (
                <div
                  className={css.addNew}
                  onClick={() => {
                    redirect("/createTest");
                  }}
                >
                  <img src={plus} alt="" />
                </div>
              ) : (
                <></>
              )}
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
