import css from "../../css/Options.module.css";

import deleteIcon from "../../assets/deleteIcon.svg";

export default function Options({
  checked,
  setChecked,
  correctOption,
  setCorrectOption,
  options,
  setOptions,
  data,
  setData,
  //   value,
  index,
}) {
  const handleInputChange = (value) => {
    data.options[index] = value;
    setData({ ...data, options: data.options });
  };

  return (
    <div className={css.options}>
      <input
        type="text"
        id="answer"
        className={css.optionValue}
        placeholder="Enter Option"
        // value={correctOption}
        onChange={(e) => {
          setCorrectOption(e.target.value);
          handleInputChange(e.target.value);
        }}
      />
      <div className={css.optionOptions}>
        <span>
          <input
            type="checkbox"
            value={checked}
            onChange={(e) => {
              setChecked(e.target.value);
            }}
          />{" "}
          Mark As Answer
        </span>
        {options > 1 ? (
          <img
            src={deleteIcon}
            height={20}
            onClick={() => {
              setData({
                ...data,
                options: data.options.filter((_, i) => i !== index),
              });
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
