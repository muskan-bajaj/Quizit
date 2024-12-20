import { useProctoring } from "../hooks/useProctoring";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Test from "./Test";
import ExamIntro from "./examComponents/Exam/ExamIntro";
import ExamPaused from "./examComponents/Exam/ExamPaused";
import Alerts from "./examComponents/Alerts";
import "../css/global.css";
export default function ProctoredTest() {
  const [examHasStarted, setExamHasStarted] = useState(false);
  const [data, setData] = useState();
  const { id } = useParams();
  const getTestDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/test/details?tid=${id}`
      );
      setData(response.data);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const { fullScreen, tabFocus } = useProctoring({
    forceFullScreen: true,
    preventTabSwitch: true,
    preventContextMenu: true,
    preventUserSelection: true,
    preventCopy: true,
  });
  useEffect(() => {
    getTestDetails();
  }, []);
  if (!examHasStarted) {
    return (
      <ExamIntro
        instructions={data?.instructions}
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

    return <Test setExamStarted={fullScreen} data={data} setData={setData} />;
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
