import css from "../../css/Options.module.css";

import deleteIcon from "../../assets/deleteIcon.svg";
import { useEffect, useState } from "react";

export default function Options({
  options,
  setOptions,
  data,
  setData,
  index,
  checked,
  setChecked,
  questionNo,
}) {
  // const [checked, setChecked] = useState([false]);
  // const [options, setOptions] = useState(1);

  const handleInputChange = (value) => {
    data.options[index] = value;
    setData((prevData) =>
      prevData.map((item, index) =>
        index === questionNo - 1 ? { ...item, options: data.options } : item
      )
    );
  };

  const handleBooleanChange = (value) => {
    const newChecked = [...checked];
    newChecked[index] = value;

    if (newChecked[index]) {
      setData((prevData) =>
        prevData.map((item, index) =>
          index === questionNo - 1
            ? { ...item, answer: [...data.answer, data.options[index]] }
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
                  (item) => item !== data.options[index]
                ),
              }
            : item
        )
      );
    }

    setChecked((prevData) =>
      prevData.map((item, index) =>
        index === questionNo - 1 ? newChecked : item
      )
    );
  };

  useEffect(() => {
    console.log(checked);
  }, [checked]);

  return (
    <div className={css.options}>
      <input
        type="text"
        id="answer"
        className={css.optionValue}
        placeholder="Enter Option"
        value={data.options[index]}
        onChange={(e) => {
          handleInputChange(e.target.value);
        }}
      />
      <div className={css.optionOptions}>
        <span>
          <input
            type="checkbox"
            checked={checked[index]}
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
              const optionValue = data.options[index];
              setData((prevData) =>
                prevData.map((item, index) =>
                  index === questionNo - 1
                    ? {
                        ...item,
                        options: data.options.filter((_, i) => i !== index),
                        answer: data.answer.filter(
                          (item, index) => item !== optionValue
                        ),
                      }
                    : item
                )
              );
              setChecked((prevData) =>
                prevData.map((item, index) =>
                  index === questionNo - 1
                    ? item.filter((_, i) => i !== index)
                    : item
                )
              );
              setOptions((prevData) =>
                prevData.map((item, index) =>
                  index === questionNo - 1 ? item - 1 : item
                )
              );
            }}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
