import { useEffect, useState } from "react";

import Options from "./Options";

import plus from "../../assets/plusCircle.svg";
import deleteIcon from "../../assets/deleteIcon.svg";

import css from "../../css/AddQuestion.module.css";

export default function AddQuestion({
  questionNo,
  setSelected,
  currentData,
  data,
  setData,
  // options,
  // setOptions,
  // checked,
  // setChecked,
}) {
  // const [currentData, setCurrentData] = useState(data);
  const [checked, setChecked] = useState([[false]]);
  const [options, setOptions] = useState([[1]]);
  const [test, setTest] = useState([1]);

  // useEffect(() => {
  //   setData((prevData) =>
  //     prevData.map((item, index) =>
  //       index === questionNo - 1 ? currentData : item
  //     )
  //   );
  // }, [currentData]);

  useEffect(() => {
    console.log(options);
    console.log("lorem");
    console.log(options[questionNo - 1]);
  }, [options]);

  const deleteQuestionHandler = () => {
    setData(data.filter((_, i) => i !== questionNo - 1));
    setSelected(1);
  };

  return (
    <div className={css.addQuestionScreen}>
      <div className={css.top}>
        <div className={css.heading}>Question {questionNo}</div>
        {data.length > 1 && (
          <div className={css.delete} onClick={() => deleteQuestionHandler()}>
            <img src={deleteIcon} alt="" height={18} />
            <span>Delete Question</span>
          </div>
        )}
      </div>
      <div className={css.inputs}>
        <label htmlFor="marks">Total Marks To Award</label>
        <input
          type="number"
          placeholder="Enter Marks"
          value={currentData.marks_awarded}
          id="marks"
          onChange={(e) => {
            setData((prevData) =>
              prevData.map((item, index) =>
                index === questionNo - 1
                  ? { ...item, marks_awarded: e.target.value }
                  : item
              )
            );
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
            setData((prevData) =>
              prevData.map((item, index) =>
                index === questionNo - 1
                  ? { ...item, question: e.target.value }
                  : item
              )
            );
          }}
        />
      </div>
      <div className={css.inputs}>
        <label htmlFor="type">Question Type</label>
        <select
          value={currentData.type}
          id="type"
          onChange={(e) => {
            setData((prevData) =>
              prevData.map((item, index) =>
                index === questionNo - 1
                  ? { ...item, type: e.target.value }
                  : item
              )
            );
          }}
        >
          <option value="long">Subjective</option>
          <option value="choice">Multiple Choice Question (MCQ)</option>
        </select>
      </div>
      {currentData.type == "long" ? (
        <div className={css.inputs}>
          <label htmlFor="answers">Enter Correct Answer</label>
          <textarea
            rows={10}
            id="answers"
            placeholder="Enter  Correct Answer"
            value={currentData.answer}
            onChange={(e) => {
              setData((prevData) =>
                prevData.map((item, index) =>
                  index === questionNo - 1
                    ? { ...item, answer: [e.target.value] }
                    : item
                )
              );
            }}
          />
        </div>
      ) : (
        <>
          <label htmlFor="answer">Options</label>
          {/* {Array.from(
            { length: options[questionNo - 1] },
            (_, index) => index
          ).map((key, index) => {
            return (
              <Options
                index={index}
                key={key}
                checked={checked[questionNo - 1]}
                setChecked={setChecked}
                options={options[questionNo - 1]}
                setOptions={setOptions}
                data={currentData}
                setData={setData}
                questionNo={questionNo}
              />
            );
          })} */}
          <div className={css.addOption}>
            <img
              src={plus}
              alt=""
              height={35}
              onClick={() => {
                // setChecked((prevData) =>
                //   prevData.map((item, index) =>
                //     index === questionNo - 1 ? [...item, false] : item
                //   )
                // );
                // console.log(checked);
                // setOptions((prevData) => {
                //   console.log(prevData);
                // });
                // console.log(options);
                // options.map((item) => {
                //   console.log(item + 1);
                // });
                setTest((prevData) => console.log(prevData));
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
