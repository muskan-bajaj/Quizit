import { useState } from "react";
import SideBar from "./SideBar";
import Settings from "./createTest/Settings";

export default function CreateTest() {
  const [settings, setSettings] = useState(true);
  return (
    <div className="flexpage">
      <SideBar settings={settings} setSettings={setSettings} />
      {settings ? <Settings /> : <></>}
    </div>
  );
}
