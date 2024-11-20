import { useState } from "react";
import SideBar from "./SideBar";
import Settings from "./createTest/Settings";
import AddQuestion from "./createTest/AddQuestion";

export default function CreateTest() {
  const [selected, setSelected] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(2);
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
      answer: [],
      options: [],
    },
  ]);

  return (
    <div className="flexpage">
      <SideBar
        selected={selected}
        setSelected={setSelected}
        totalQuestions={totalQuestions}
        setTotalQuestions={setTotalQuestions}
        questionData={questionData}
        setQuestionData={setQuestionData}
        settingsData={settingsData}
        setSettingsData={setSettingsData}
      />
      {selected == 0 ? (
        <Settings data={settingsData} setData={setSettingsData} s />
      ) : (
        <AddQuestion
          questionNo={selected}
          data={questionData}
          setData={setQuestionData}
        />
      )}
    </div>
  );
}
