import SideBar from "./SideBar";

import css from "../css/ResultAnalysis.module.css";
import SubmissionCard from "./cards/SubmissionCard";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import { toast } from "react-toastify";

export default function ResultAnalysis() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const publishTest = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/test/publish?tid=${id}`
      );
      if (response.status === 200) {
        toast.success("Test Published");
      }
      setLoading(false);
      console.log(response);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };
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
  }, [loading]);

  return (
    <div className="flexpage">
      <SideBar />
      {loading ? (
        <Loading />
      ) : (
        <div className={css.submissionScreen}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
            }}
          >
            <div className={css.heading}>Submissions</div>
            <button
              className={css.publishBtn}
              onClick={() => {
                setLoading(true);
                publishTest();
              }}
            >
              {data[0].published ? "Published" : "Publish"}
            </button>
          </div>
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
