import { useState } from "react";
import SideBar from "./SideBar";
import Settings from "./createTest/Settings";
import AddQuestion from "./createTest/AddQuestion";

export default function CreateTest() {
  const [selected, setSelected] = useState(0);
  const [options, setOptions] = useState([1]);
  const [checked, setChecked] = useState([[false]]);
  const [settingsData, setSettingsData] = useState({
    violation_count: "",
    totalQuestions: "",
    shuffle_questions: true,
    proctoring: true,
    start_time: "",
    end_time: "",
    student_list: "",
    instruction: "",
    name: "",
    subject: "",
    semester: "",
  });
  const [questionData, setQuestionData] = useState([
    {
      marks_awarded: "",
      question: "",
      type: "long",
      answer: "",
      options: [],
    },
  ]);

  return (
    <div className="flexpage">
      <SideBar
        selected={selected}
        setSelected={setSelected}
        questionData={questionData}
        setQuestionData={setQuestionData}
        settingsData={settingsData}
        setSettingsData={setSettingsData}
        options={options}
        setOptions={setOptions}
        checked={checked}
        setChecked={setChecked}
      />
      {selected == 0 && (
        <Settings data={settingsData} setData={setSettingsData} />
      )}
      {selected != 0 && (
        <AddQuestion
          questionNo={selected}
          setSelected={setSelected}
          currentData={questionData[selected - 1]}
          data={questionData}
          setData={setQuestionData}
          options={options}
          setOptions={setOptions}
          checked={checked}
          setChecked={setChecked}
        />
      )}
      {/* {selected == 0 ? (
        <Settings data={settingsData} setData={setSettingsData} s />
      ) : (
        <AddQuestion
          questionNo={selected}
          setSelected={setSelected}
          data={questionData}
          setData={setQuestionData}
        />
      )} */}
    </div>
  );
}
