import React from "react";

type Props = {
  onClick: VoidFunction;
  instructions?: string;
};

const ExamIntro = (props: Props) => {
  return (
    <div className="exam-intro-root">
      <h1>Welcome to the exam</h1>
      {props?.instructions ? (
        <>
          <div>
            <h1>Instructions</h1>
            <p style={{ width: "100%", textAlign: "center" }}>
              {props.instructions}
            </p>
            <br></br>
          </div>
        </>
      ) : (
        <></>
      )}
      <div>
        <button onClick={props.onClick}>Continue</button>
      </div>
    </div>
  );
};

export default ExamIntro;
