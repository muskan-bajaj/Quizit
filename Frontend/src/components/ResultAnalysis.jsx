import SideBar from "./SideBar";

import css from "../css/ResultAnalysis.module.css";
import SubmissionCard from "./cards/SubmissionCard";

export default function ResultAnalysis() {
  const data = [
    {
      name: "Muskan Bajaj",
      roll: "21051228",
      violations: 3,
      date: "27-09-10 12:00 PM",
      score: "6/10",
    },
    {
      name: "Vinit Agarwal",
      roll: "21051275",
      violations: 3,
      date: "27-09-10 12:00 PM",
      score: "6/10",
    },
  ];
  return (
    <div className="flexpage">
      <SideBar />
      <div className={css.submissionScreen}>
        <div className={css.heading}>Submissions</div>
        <div className={css.view}>
          <div className={css.headers}>
            <div></div>
            <div>Name</div>
            <div>Roll No.</div>
            <div>Violation Count</div>
            <div>Submitted On</div>
            <div>Marks Awarded</div>
          </div>
          {data.map((dataMap, index) => {
            return <SubmissionCard key={index} index={index} data={dataMap} />;
          })}
        </div>
      </div>
    </div>
  );
}
