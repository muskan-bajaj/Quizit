import { useEffect, useState } from "react";

import Options from "./Options";

import plus from "../../assets/plusCircle.svg";

import css from "../../css/AddQuestion.module.css";

export default function AddQuestion({ questionNo, data, setData }) {
  const [currentData, setCurrentData] = useState(data[questionNo - 1]);
  const [checked, setChecked] = useState(false);
  const [correctOption, setCorrectOption] = useState("");
  const [options, setOptions] = useState(1);

  useEffect(() => {
    setData((prevData) =>
      prevData.map((item, index) =>
        index === questionNo - 1 ? currentData : item
      )
    );
  }, [currentData]);

  useEffect(() => {
    if (checked) {
      setCurrentData({
        ...currentData,
        answer: [...currentData.answer, correctOption],
      });
    } else {
      // var index = currentData.answer.indexOf(correctOption);
      setCurrentData({
        ...currentData,
        answer: currentData.answer.filter(function (item) {
          return item !== correctOption;
        }),
      });
    }
  }, [checked]);

  return (
    <div className={css.addQuestionScreen}>
      <div className={css.heading}>Question {questionNo}</div>
      <div className={css.inputs}>
        <label htmlFor="marks">Total Marks To Award</label>
        <input
          type="number"
          placeholder="Enter Marks"
          value={currentData.marks}
          id="marks"
          onChange={(e) => {
            setCurrentData({ ...currentData, marks: e.target.value });
          }}
        />
      </div>
      <div className={css.inputs}>
        <label htmlFor="question">Question</label>
        <textarea
          rows={10}
          id="question"
          placeholder="Enter Question and related instructions"
          value={currentData.question}
          onChange={(e) => {
            setCurrentData({
              ...currentData,
              question: e.target.value,
            });
          }}
        />
      </div>
      <div className={css.inputs}>
        <label htmlFor="type">Question Type</label>
        <select
          value={currentData.questionType}
          id="type"
          onChange={(e) => {
            setCurrentData({
              ...currentData,
              questionType: e.target.value,
            });
          }}
        >
          <option value="subjective">Subjective</option>
          <option value="mcq">Multiple Choice Question (MCQ)</option>
        </select>
      </div>
      {currentData.questionType == "subjective" ? (
        <div className={css.inputs}>
          <label htmlFor="answers">Enter Correct Answer</label>
          <textarea
            rows={10}
            id="answers"
            placeholder="Enter  Correct Answer"
            value={currentData.answer}
            onChange={(e) => {
              setCurrentData({ ...currentData, answer: e.target.value });
            }}
          />
        </div>
      ) : (
        <>
          <label htmlFor="answer">Options</label>
          {Array.from({ length: options }, (_, index) => index).map(
            (key, index) => {
              return (
                <Options
                  value={currentData.options[index]}
                  index={index}
                  key={key}
                  checked={checked}
                  setChecked={setChecked}
                  correctOption={correctOption}
                  setCorrectOption={setCorrectOption}
                  options={options}
                  setOptions={setOptions}
                  data={currentData}
                  setData={setCurrentData}
                />
              );
            }
          )}
          <div className={css.addOption}>
            <img
              src={plus}
              alt=""
              height={35}
              onClick={() => {
                setOptions(options + 1);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}