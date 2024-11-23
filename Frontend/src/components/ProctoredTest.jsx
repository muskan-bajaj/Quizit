import { useProctoring } from "../hooks/useProctoring";
import { useState } from "react";
import Test from "./Test";
import ExamIntro from "./examComponents/Exam/ExamIntro";
import ExamPaused from "./examComponents/Exam/ExamPaused";
import Alerts from "./examComponents/Alerts";
import "../css/global.css";
export default function ProctoredTest() {
  const [examHasStarted, setExamHasStarted] = useState(false);

  const { fullScreen, tabFocus } = useProctoring({
    forceFullScreen: true,
    preventTabSwitch: true,
    preventContextMenu: true,
    preventUserSelection: true,
    preventCopy: true,
  });

  if (!examHasStarted) {
    return (
      <ExamIntro
        onClick={() => {
          fullScreen.trigger();
          // Wait before react finishes updating state. flushSync doesn't seem to work
          setTimeout(() => {
            setExamHasStarted(true);
          }, 100);
        }}
      />
    );
  }

  const getContent = () => {
    if (fullScreen.status === "off") return <ExamPaused />;
    if (tabFocus.status === false) return <ExamPaused />;

    return <Test setExamStarted={fullScreen} />;
  };

  return (
    <>
      {/* For debugging purpose */}
      {/* <pre>{JSON.stringify({ fullScreen, tabFocus }, null, 2)}</pre> */}

      <div className="test-container">{getContent()}</div>
      <Alerts fullScreen={fullScreen} tabFocus={tabFocus} />
    </>
  );
}
