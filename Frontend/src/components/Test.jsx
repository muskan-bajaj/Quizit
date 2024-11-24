import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import QuestionNavigation from "./QuestionNavigation";
import InstructionModal from "./modal/InstructionModal";
import SubmitModal from "./modal/SubmitModal";

import css from "../css/Test.module.css";

export default function Test({ setExamStarted }) {
  const { id } = useParams();
  const [data, setData] = useState();
  const [visited, setVisited] = useState([true]);
  const [answer, setAnswer] = useState([]);

  const [viewInstructionModal, setViewInstructionModal] = useState(true);
  const [viewSubmitModal, setViewSubmitModal] = useState(false);

  const getTestDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/test/details?tid=${id}`
      );
      setData(response.data);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const submitAnswerHandler = async (qid, answer) => {
    try {
      const response = await axios.post("http://localhost:3000/test/submit", {
        tid: id,
        qid: qid,
        answer: answer,
      });
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getTestDetails();
  }, []);

  return (
    <>
      <div className="flexpage">
        <QuestionNavigation
          data={data}
          visited={visited}
          type="view"
          setExamStarted={setExamStarted}
        />
        {data && data.questionBanks.length !== 0 ? (
          <div className={css.testScreen}>
            <div className={css.heading}>Question {visited.length}</div>
            <div className={css.answerScreen}>
              {data && data.instructions ? (
                <div className={css.instructions}>
                  Instruction:
                  <br />
                  {data.instructions}
                </div>
              ) : (
                <></>
              )}

              <div className={css.question}>
                Question:
                <br />
                {data && data.questionBanks[visited.length - 1].question}
              </div>
              {data && data.questionBanks[visited.length - 1].type == "long" ? (
                <div className={css.long}>
                  <textarea
                    value={answer.length > 0 ? answer[0] : ""}
                    onChange={(e) => {
                      setAnswer([e.target.value]);
                    }}
                    placeholder="Enter Your Answer..."
                    rows={15}
                  />
                </div>
              ) : (
                <div className={css.choice}>
                  {data &&
                    data.questionBanks[visited.length - 1].options.map(
                      (value, index) => {
                        return (
                          <label key={index} className={css.checkbox}>
                            <input
                              type="checkbox"
                              value={value}
                              checked={answer.includes(value)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setAnswer([...answer, e.target.value]);
                                } else {
                                  setAnswer(
                                    answer.filter(
                                      (item) => item !== e.target.value
                                    )
                                  );
                                }
                              }}
                            />
                            <span className={css.checkmark}></span>
                            <span style={{ color: "black" }}>{value}</span>
                          </label>
                        );
                      }
                    )}
                </div>
              )}
              <div className={css.nextButton}>
                {data && visited.length == data.questionBanks.length ? (
                  <button
                    onClick={() => {
                      setViewSubmitModal(true);
                      submitAnswerHandler(
                        data.questionBanks[visited.length - 1].qid,
                        answer
                      );
                    }}
                  >
                    Submit Test
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      submitAnswerHandler(
                        data.questionBanks[visited.length - 1].qid,
                        answer
                      );
                      setVisited([...visited, true]);
                      setAnswer([]);
                    }}
                  >
                    Next Question
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <span className={css.heading} style={{ padding: "10px" }}>
            Test Has Already Been Submitted
          </span>
        )}
      </div>
      {data && data.instructions && viewInstructionModal && (
        <InstructionModal
          instructions={data.instructions}
          setViewInstructionModal={setViewInstructionModal}
        />
      )}
      {viewSubmitModal && <SubmitModal setExamStarted={setExamStarted} />}
    </>
  );
}
