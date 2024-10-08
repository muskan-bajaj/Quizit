// import React from "react";

import css from "../../css/Settings.module.css";

export default function Settings() {
  return (
    <div className={css.settingsScreen}>
      <div className={css.heading}>Test Setting</div>
      <div className={css.inputs}>
        <label htmlFor="violations">Total Number of Violation Allowed</label>
        <input type="number" placeholder="Enter Count" />
      </div>
      <div className={css.inputs}>
        <label htmlFor="totalquestions">Questions in Test</label>
        <input type="number" placeholder="Enter Count" />
      </div>
      <div className={css.inputs}>
        <label htmlFor="shuffle">Shuffle Questions</label>
        <select>
          <option value="true" selected>
            True
          </option>
          <option value="false">False</option>
        </select>
      </div>
      <div className={css.inputs}>
        <label htmlFor="proctor">Enable Proctoring</label>
        <select>
          <option value="true" selected>
            True
          </option>
          <option value="false">False</option>
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
          />
          <input
            type="text"
            placeholder="To"
            onFocus={(e) => (e.target.type = "datetime-local")}
            onBlur={(e) => (e.target.type = "text")}
          />
        </div>
      </div>
      <div className={css.inputs}>
        <label htmlFor="rollnos">Add Students Roll No.</label>
        <textarea
          rows={10}
          placeholder="Enter CSV or Copy/paste Excel Column"
        />
      </div>
      <div className={css.inputs}>
        <label htmlFor="rollnos">Instructions</label>
        <textarea rows={10} placeholder="Enter Instruction" />
      </div>
    </div>
  );
}
