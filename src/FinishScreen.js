function FinishScreen({ points, maxPoints, highScore, dispatch }) {
  const percentage = Math.ceil((points / maxPoints) * 100);
  let emoji;
  if (percentage >= 100) {
    emoji = "🎉";
  } else if (percentage >= 80) {
    emoji = "👏";
  } else if (percentage >= 50) {
    emoji = "😬";
  } else {
    emoji = "😢";
  }
  return (
    <>
      <p className="result">
        <span>{emoji}</span> you got <strong>{points}</strong> out of{" "}
        <strong>{maxPoints}</strong> points ({percentage}%)
      </p>
      <p className="highscore">
        Highscore: <strong>{highScore}</strong>
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Try again
      </button>
    </>
  );
}

export default FinishScreen;
