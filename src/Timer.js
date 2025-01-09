import { useEffect } from "react";

function Timer({ dispatch, timeLeft }) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  useEffect(() => {
    if (timeLeft === 0) {
      dispatch({ type: "finish" });
    }
    const countDown = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(countDown);
  }, [dispatch, timeLeft]);
  return (
    <div className="timer">
      {minutes < 10 ? "0" + minutes : minutes} :{" "}
      {seconds < 10 ? "0" + seconds : seconds}
    </div>
  );
}

export default Timer;
