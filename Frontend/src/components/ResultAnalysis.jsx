import SideBar from "./SideBar";

import css from "../css/ResultAnalysis.module.css";
import SubmissionCard from "./cards/SubmissionCard";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../Loading";

export default function ResultAnalysis() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSubmissionDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/test/submission/list?tid=${id}`
      );
      setData(response.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getSubmissionDetails();
  }, []);

  return (
    <div className="flexpage">
      <SideBar />
      {loading ? (
        <Loading />
      ) : (
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
              return (
                <SubmissionCard key={index} index={index} data={dataMap} />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
