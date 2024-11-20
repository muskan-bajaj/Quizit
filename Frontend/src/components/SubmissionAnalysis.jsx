import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import QuestionNavigation from "./QuestionNavigation";

import css from "../css/SubmissionAnalysis.module.css";

export default function SubmissionAnalysis() {
  const { id } = useParams();
  const [data, setData] = useState();
  const [questionBank, setQuestionBank] = useState([]);
  const [current, setCurrent] = useState(0);

  const getTestDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/test/details?tid=${id}`
      );
      setData(response.data);
      setQuestionBank(response.data.questionBanks);
      console.log(questionBank);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getTestDetails();
  }, []);

  return (
    <div className="flexpage">
      <QuestionNavigation
        data={data}
        visited={current}
        setVisited={setCurrent}
        type="navigation"
      />
      <div className={css.submissionScreen}>
        <div className={css.heading}>Question {current + 1}</div>
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
            {data && data.questionBanks[current].question}
          </div>
          {data && data.questionBanks[current].type == "long" ? (
            <div className={css.long}>
              <textarea
                // value={answer.length > 0 ? answer[0] : ""}
                // onChange={(e) => {
                //   setAnswer([e.target.value]);
                // }}
                placeholder="Enter Your Answer..."
                rows={15}
              />
            </div>
          ) : (
            <div className={css.choice}>
              {data &&
                data.questionBanks[current].options.map((value, index) => {
                  return (
                    <label key={index} className={css.checkbox}>
                      <input
                        type="checkbox"
                        value={value.option}
                        // checked={answer.includes(value.option)}
                        // onChange={(e) => {
                        //   if (e.target.checked) {
                        //     setAnswer([...answer, e.target.value]);
                        //   } else {
                        //     setAnswer(
                        //       answer.filter(
                        //         (item) => item !== e.target.value
                        //       )
                        //     );
                        //   }
                        // }}
                      />
                      <span className={css.checkmark}></span>
                      {value.option}
                    </label>
                  );
                })}
            </div>
          )}
          <div className={css.nextButton}>
            {/* {data && visited.length == data.questionCount ? (
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
              ) : ( */}
            <button
              onClick={() => {
                // submitAnswerHandler(
                //   data.questionBanks[visited.length - 1].qid,
                //   answer
                // );
                // setVisited([...visited, true]);
                // setAnswer([]);
                setCurrent(current + 1);
              }}
            >
              Next Question
            </button>
            {/* )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
