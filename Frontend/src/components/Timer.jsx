import React from "react";
import { useTimer } from "react-timer-hook";
export default function MyTimer({ expiryTimestamp }) {
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "large" }}>
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
    </div>
  );
}
