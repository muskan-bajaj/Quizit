// import React from "react";

import css from "../../css/Settings.module.css";

export default function Settings({ data, setData }) {
  return (
    <div className={css.settingsScreen}>
      <div className={css.heading}>Test Setting</div>
      <div className={css.inputs}>
        <label htmlFor="violations">Total Number of Violation Allowed</label>
        <input
          type="number"
          placeholder="Enter Count"
          value={data.violation}
          onChange={(e) => {
            setData({ ...data, violation: e.target.value });
          }}
        />
      </div>
      <div className={css.inputs}>
        <label htmlFor="totalquestions">Questions in Test</label>
        <input
          type="number"
          placeholder="Enter Count"
          value={data.totalQuestions}
          onChange={(e) => {
            setData({ ...data, totalQuestions: e.target.value });
          }}
        />
      </div>
      <div className={css.inputs}>
        <label htmlFor="shuffle">Shuffle Questions</label>
        <select
          value={data.shuffle}
          onChange={(e) => {
            setData({ ...data, shuffle: e.target.value });
          }}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
      </div>
      <div className={css.inputs}>
        <label htmlFor="proctor">Enable Proctoring</label>
        <select
          value={data.proctor}
          onChange={(e) => {
            setData({ ...data, proctor: e.target.value });
          }}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
      </div>
      <div className={css.inputs}>
        <label htmlFor="duration">Test Duration</label>
        <div className={css.duration}>
          <input
            type="text"
            placeholder="From"
            onFocus={(e) => (e.target.type = "datetime-local")}
            onBlur={(e) => (e.target.type = "text")}
            value={
              data.start
                ? new Date(data.start).toISOString().substring(0, 16)
                : ""
            }
            onChange={(e) => {
              setData({ ...data, start: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="To"
            onFocus={(e) => (e.target.type = "datetime-local")}
            onBlur={(e) => (e.target.type = "text")}
            value={
              data.end ? new Date(data.end).toISOString().substring(0, 16) : ""
            }
            onChange={(e) => {
              setData({ ...data, end: e.target.value });
            }}
          />
        </div>
      </div>
      <div className={css.inputs}>
        <label htmlFor="rollnos">Add Students Roll No.</label>
        <textarea
          rows={10}
          placeholder="Enter CSV or Copy/paste Excel Column"
          value={data.rollno}
          onChange={(e) => {
            setData({ ...data, rollno: e.target.value });
          }}
        />
      </div>
      <div className={css.inputs}>
        <label htmlFor="rollnos">Instructions</label>
        <textarea
          rows={10}
          placeholder="Enter Instruction"
          value={data.instructions}
          onChange={(e) => {
            setData({ ...data, instructions: e.target.value });
          }}
        />
      </div>
    </div>
  );
}
