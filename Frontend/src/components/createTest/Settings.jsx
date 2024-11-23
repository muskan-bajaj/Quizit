// import React from "react";
import { useState, useEffect } from "react";
import css from "../../css/Settings.module.css";
import moment from "moment-timezone";
import axios from "axios";

export default function Settings({ data, setData }) {
  const [subjects, setSubjects] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/test/subjects").then((res) => {
      console.log(res.data);
      setSubjects([...res.data]);
    });
  }, []);

  return (
    <div className={css.settingsScreen}>
      <div className={css.heading}>Test Setting</div>
      <div className={css.inputs}>
        <label htmlFor="name">Test Name</label>
        <input
          type="text"
          placeholder="Enter Test Name"
          value={data.name}
          onChange={(e) => {
            setData({ ...data, name: e.target.value });
          }}
        />
      </div>
      <div className={css.inputs}>
        <label htmlFor="subject">Subject Name</label>
        {/* <input
          type="text"
          placeholder="Enter Subject Name"
          value={data.subject}
          onChange={(e) => {
            setData({ ...data, subject: e.target.value });
          }}
        /> */}
        <select
          onChange={(e) => {
            console.log(e.target.value);
            setData({ ...data, subject: e.target.value });
          }}
        >
          <option value="" disabled selected>
            Select Subject
          </option>
          {subjects.map((subject, idx) => (
            <option key={idx} value={subject.sid}>
              {`${subject.name} ${subject.subjectId ?? ""}`}
            </option>
          ))}
        </select>
      </div>
      <div className={css.inputs}>
        <label htmlFor="semester">Semester</label>
        <input
          type="number"
          placeholder="Enter Semester Number"
          value={data.semester}
          onChange={(e) => {
            setData({ ...data, semester: e.target.value });
          }}
        />
      </div>
      <div className={css.inputs}>
        <label htmlFor="violations">Total Number of Violation Allowed</label>
        <input
          type="number"
          placeholder="Enter Count"
          value={data.violation_count}
          onChange={(e) => {
            setData({ ...data, violation_count: e.target.value });
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
          value={data.shuffle_questions}
          onChange={(e) => {
            setData({ ...data, shuffle_questions: e.target.value });
          }}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </select>
      </div>
      <div className={css.inputs}>
        <label htmlFor="proctor">Enable Proctoring</label>
        <select
          value={data.proctoring}
          onChange={(e) => {
            setData({ ...data, proctoring: e.target.value });
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
              data.start_time
                ? moment(data.start_time).format("yyyy-MM-DD hh:mm")
                : ""
            }
            onChange={(e) => {
              setData({ ...data, start_time: moment(e.target.value).format() });
            }}
          />
          <input
            type="text"
            placeholder="To"
            onFocus={(e) => (e.target.type = "datetime-local")}
            onBlur={(e) => (e.target.type = "text")}
            value={
              data.end_time
                ? moment(data.end_time).format("yyyy-MM-DD hh:mm")
                : ""
            }
            onChange={(e) => {
              setData({ ...data, end_time: moment(e.target.value).format() });
            }}
          />
        </div>
      </div>
      <div className={css.inputs}>
        <label htmlFor="rollnos">Add Students Roll No.</label>
        <textarea
          rows={10}
          placeholder="Enter CSV or Copy/paste Excel Column"
          value={data.student_list}
          onChange={(e) => {
            setData({ ...data, student_list: e.target.value });
          }}
        />
      </div>
      <div className={css.inputs}>
        <label htmlFor="instructions">Instructions</label>
        <textarea
          rows={10}
          placeholder="Enter Instruction"
          value={data.instruction}
          onChange={(e) => {
            setData({ ...data, instructions: e.target.value });
          }}
        />
      </div>
    </div>
  );
}
