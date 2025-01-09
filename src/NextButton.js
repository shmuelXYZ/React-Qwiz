function NextButton({ dispatch, answer, index, numQuestions }) {
  const isQwizFinished = index === numQuestions - 1;
  console.log(isQwizFinished, index, numQuestions);
  if (answer === null) return null;
  return (
    <button
      className="btn btn-ui"
      onClick={
        isQwizFinished
          ? () => dispatch({ type: "finish" })
          : () => dispatch({ type: "nextQuestion" })
      }
    >
      {isQwizFinished ? `The End` : `Next`}
    </button>
  );
}

export default NextButton;
