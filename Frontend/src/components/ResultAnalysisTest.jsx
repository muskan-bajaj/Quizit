import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import QuestionNavigation from "./QuestionNavigation";

import css from "../css/SubmissionAnalysis.module.css";

export default function ResultAnalysisTest() {
  const { id } = useParams();
  const [data, setData] = useState();
  const [questionBank, setQuestionBank] = useState([]);
  const [current, setCurrent] = useState(0);

  const getTestDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/test/report?tid=${id}`
      );
      setData({ questionCount: response.data.submission.length });
      setQuestionBank(response.data.submission);
      // console.log(questionBank);
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
        {questionBank[current] && (
          <div className={css.inputs}>
            <label htmlFor="question">Question</label>
            <input
              id="question"
              type="text"
              value={questionBank[current].question}
              disabled
            />
          </div>
        )}
        {questionBank[current] && (
          <div className={css.inputs}>
            <label htmlFor="answer">Expected Answer</label>
            <input
              id="answer"
              type="text"
              value={
                questionBank[current].type == "choice"
                  ? questionBank[current].answer?.join(", ") || ""
                  : questionBank[current].answer
              }
              disabled
            />
          </div>
        )}
      </div>
    </div>
  );
}
