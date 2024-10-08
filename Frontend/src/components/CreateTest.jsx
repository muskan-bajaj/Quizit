import { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Settings from "./createTest/Settings";

export default function CreateTest() {
  const [viewSettings, setViewSettings] = useState(true);
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
      <SideBar settings={viewSettings} setSettings={setViewSettings} />
      {viewSettings ? (
        <Settings data={settingsData} setData={setSettingsData} />
      ) : (
        <></>
      )}
    </div>
  );
}
