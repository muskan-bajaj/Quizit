import css from "../../css/Options.module.css";

import deleteIcon from "../../assets/deleteIcon.svg";

export default function Options({
  options,
  setOptions,
  data,
  setData,
  index,
  checked,
  setChecked,
}) {
  const handleInputChange = (value) => {
    data.options[index] = value;
    setData({ ...data, options: data.options });
  };

  const handleBooleanChange = (value) => {
    const newChecked = [...checked];
    newChecked[index] = value;

    if (newChecked[index]) {
      setData({
        ...data,
        answer: [...data.answer, data.options[index]],
      });
    } else {
      setData({
        ...data,
        answer: data.answer.filter((item) => item !== data.options[index]),
      });
    }
    setChecked(newChecked);
  };

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
              setData({
                ...data,
                options: data.options.filter((_, i) => i !== index),
                answer: data.answer.filter((item) => item !== optionValue),
              });
              setChecked(checked.filter((_, i) => i !== index));
              setOptions(options - 1);
            }}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
