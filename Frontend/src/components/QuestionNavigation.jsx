import { useNavigate } from "react-router-dom";

import logo from "../assets/KIITLogo.svg";
import back from "../assets/backArrow.svg";

import css from "../css/QuestionNavigation.module.css";

export default function QuestionNavigation({
  data,
  visited,
  setVisited,
  type,
}) {
  const redirect = useNavigate();

  return (
    <div className={css.sidebar}>
      <div className={logo}>
        <img src={logo} />
      </div>
      {data &&
        Array.from({ length: data.questionCount }, (_, index) => index).map(
          (_, index) => {
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
          }
        )}
      <div className={css.navItems}>
        <img
          src={back}
          onClick={() => {
            if (type == "navigation") {
              redirect("/results");
            } else {
              redirect("/assessment");
            }
          }}
        />
      </div>
    </div>
  );
}
