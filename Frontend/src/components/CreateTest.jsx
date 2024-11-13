import { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Settings from "./createTest/Settings";

export default function CreateTest() {
  const [selected, setSelected] = useState(0);
  // const [states, setStates] = useState();
  // const [viewSettings, setViewSettings] = useState(true);
  const [totalQuestions, setTotalQuestions] = useState(2);
  const [settingsData, setSettingsData] = useState({
    violation: "",
    totalQuestions: "",
    shuffle: true,
    proctor: true,
    start: "",
    end: "",
    rollno: "",
    instructions: "",
  });

  useEffect(() => {
    console.log(settingsData);
  }, [settingsData]);

  return (
    <div className="flexpage">
      <SideBar
        data={settingsData}
        selected={selected}
        setSelected={setSelected}
        totalQuestions={totalQuestions}
        setTotalQuestions={setTotalQuestions}
      />
      {selected == 0 ? (
        <Settings data={settingsData} setData={setSettingsData} />
      ) : (
        <></>
      )}
    </div>
  );
}
