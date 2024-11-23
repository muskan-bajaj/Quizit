import css from "../../css/Options.module.css";

import deleteIcon from "../../assets/deleteIcon.svg";
import { useEffect, useState } from "react";

export default function Options({
  options,
  setOptions,
  data,
  setData,
  indexOption,
  checked,
  setChecked,
  questionNo,
}) {
  const handleInputChange = (value) => {
    data.options[indexOption] = value;
    setData((prevData) =>
      prevData.map((item, indexOption) =>
        indexOption === questionNo - 1
          ? { ...item, options: data.options }
          : item
      )
    );
  };

  const handleBooleanChange = (value) => {
    setChecked((prevChecked) => {
      const updatedChecked = [...prevChecked];
      updatedChecked[questionNo - 1][indexOption] = value;
      return updatedChecked;
    });
    if (value) {
      setData((prevData) =>
        prevData.map((item, index) =>
          index === questionNo - 1
            ? { ...item, answer: [...data.answer, data.options[indexOption]] }
            : item
        )
      );
    } else {
      setData((prevData) =>
        prevData.map((item, index) =>
          index === questionNo - 1
            ? {
                ...item,
                answer: data.answer.filter(
                  (item) => item !== data.options[indexOption]
                ),
              }
            : item
        )
      );
    }
  };

  const handleDeleteOption = () => {
    const optionValue = data.options[indexOption];
    setData((prevData) =>
      prevData.map((item, index) =>
        index === questionNo - 1
          ? {
              ...item,
              options: item.options.filter((_, i) => i !== indexOption),
              answer: item.answer.filter((item) => item !== optionValue),
            }
          : item
      )
    );
    setOptions((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[questionNo - 1] -= 1;
      return updatedOptions;
    });
    setChecked((prevChecked) => {
      const updatedChecked = [...prevChecked];
      updatedChecked[questionNo - 1] = updatedChecked[questionNo - 1].filter(
        (_, i) => i !== indexOption
      );
      return updatedChecked;
    });
  };

  return (
    <div className={css.options}>
      <input
        type="text"
        id="answer"
        className={css.optionValue}
        placeholder="Enter Option"
        value={data.options[indexOption]}
        onChange={(e) => {
          handleInputChange(e.target.value);
        }}
      />
      <div className={css.optionOptions}>
        <span>
          <input
            type="checkbox"
            checked={checked[indexOption]}
            onChange={(e) => {
              handleBooleanChange(e.target.checked);
            }}
          />{" "}
          Mark As Answer
        </span>
        {options > 1 ? (
          <img
            src={deleteIcon}
            height={20}
            onClick={() => {
              handleDeleteOption();
            }}
            // onClick={() => {
            //   const optionValue = data.options[index];
            //   setData((prevData) =>
            //     prevData.map((item, index) =>
            //       index === questionNo - 1
            //         ? {
            //             ...item,
            //             options: data.options.filter((_, i) => i !== index),
            //             answer: data.answer.filter(
            //               (item, index) => item !== optionValue
            //             ),
            //           }
            //         : item
            //     )
            //   );
            //   setChecked((prevData) =>
            //     prevData.map((item, index) =>
            //       index === questionNo - 1
            //         ? item.filter((_, i) => i !== index)
            //         : item
            //     )
            //   );
            //   setOptions((prevData) =>
            //     prevData.map((item, index) =>
            //       index === questionNo - 1 ? item - 1 : item
            //     )
            //   );
            // }}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
