import { useNavigate } from "react-router-dom";

import logo from "../assets/KIITLogo.svg";
import back from "../assets/backArrow.svg";
import css from "../css/QuestionNavigation.module.css";
import MyTimer from "./Timer";
import moment from "moment-timezone";
export default function QuestionNavigation({
  data,
  visited,
  setVisited,
  type,
  setExamStarted,
  submission = false,
}) {
  const redirect = useNavigate();
  var expiryTimestamp = moment(data.end);
  var now = moment();
  var duration = moment.duration(expiryTimestamp.diff(now));
  console.log(duration.asSeconds());
  console.log(data);
  return (
    <div className={css.sidebar}>
      <div className={logo}>
        <img src={logo} />
      </div>
      <MyTimer expiryTimestamp={expiryTimestamp} />
      {data &&
        Array.from(
          { length: submission ? data.length : data.questionBanks.length },
          (_, index) => index
        ).map((_, index) => {
          return (
            <div
              key={index}
              className={css.navItems}
              id={css.numbers}
              style={
                type == "view"
                  ? visited.length == index + 1
                    ? { backgroundColor: "#ffffff" }
                    : visited[index]
                    ? { backgroundColor: "#03C988" }
                    : { backgroundColor: "" }
                  : visited == index
                  ? { backgroundColor: "#ffffff", cursor: "pointer" }
                  : { backgroundColor: "#4b515b", cursor: "pointer" }
              }
              onClick={() => {
                if (type == "navigation") {
                  setVisited(index);
                }
              }}
            >
              {index + 1}
            </div>
          );
        })}
      <div className={css.navItems}>
        <img
          src={back}
          onClick={() => {
            if (type == "navigation") {
              redirect("/results");
            } else {
              setExamStarted.exit();
              redirect("/assessment");
            }
          }}
        />
      </div>
    </div>
  );
}
