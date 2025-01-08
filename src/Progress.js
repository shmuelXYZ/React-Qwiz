function Progress({ current, total, points, maxPoints, answer }) {
  return (
    <header className="progress">
      <progress
        max={total}
        value={answer !== null ? current + 1 : current}
      ></progress>
      <p>
        Question <strong>{current + 1}</strong>/{total}
      </p>
      <p>
        <strong>{points}</strong>/{maxPoints} points
      </p>
    </header>
  );
}

export default Progress;
