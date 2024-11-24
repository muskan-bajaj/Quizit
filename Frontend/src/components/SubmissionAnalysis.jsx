import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import QuestionNavigation from "./QuestionNavigation";
import Loading from "../Loading";

import css from "../css/SubmissionAnalysis.module.css";

import aiIcon from "../assets/aiIcon.svg";

export default function SubmissionAnalysis() {
  const { id } = useParams();
  const [data, setData] = useState();
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  const getTestDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/test/report?tid=${id}`
      );
      setData(response.data.submission);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTestDetails();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flexpage">
          <QuestionNavigation
            data={data}
            visited={current}
            setVisited={setCurrent}
            type="navigation"
            submission={true}
          />
          <div className={css.submissionScreen}>
            <div className={css.heading}>Question {current + 1}</div>
            <div className={css.views}>
              <div className={css.answerScreen}>
                <>
                  {data[current].instructions ? (
                    <div className={css.instructions}>
                      Instruction:
                      <br />
                      {data[current].instructions}
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className={css.question}>
                    Question:
                    <br />
                    {data[current].question}
                  </div>
                  {data[current].type == "long" ? (
                    <div className={css.long}>
                      <textarea
                        value={data[current].answer}
                        disabled
                        rows={15}
                      />
                    </div>
                  ) : (
                    <div className={css.choice}>
                      {data[current].options.map((value, index) => {
                        return (
                          <label key={index} className={css.checkbox}>
                            <input
                              type="checkbox"
                              checked={data[current].answer.includes(value)}
                              disabled
                            />
                            <span className={css.checkmark}></span>
                            {value}
                          </label>
                        );
                      })}
                    </div>
                  )}
                  <div className={css.nextButton}>
                    <button
                      style={{ backgroundColor: "#13005A", display: "none" }}
                    >
                      Recheck
                    </button>
                    <button
                      style={{ backgroundColor: "#393E46", fontWeight: "bold" }}
                    >
                      {data[current].marksObtained}/{data[current].marksAwarded}
                    </button>
                    {current > 0 ? (
                      <button
                        style={{ backgroundColor: "#1C82AD" }}
                        onClick={() => {
                          setCurrent(current - 1);
                        }}
                      >
                        Previous Question
                      </button>
                    ) : (
                      <></>
                    )}
                    {current < data.length - 1 ? (
                      <button
                        onClick={() => {
                          setCurrent(current + 1);
                        }}
                      >
                        Next Question
                      </button>
                    ) : (
                      <></>
                    )}
                  </div>
                </>
              </div>
              <div className={css.answerScreen}>
                <div className={css.aiHeading}>
                  <img src={aiIcon} alt="" />
                  <div>AI Explanation :-</div>
                </div>
                <div className={css.explaination}>
                  {data[current].AiExplanation
                    ? data[current].AiExplanation
                    : "AI Explaination not available."}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
