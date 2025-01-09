// import DateCounter from "./DateCounter";
import { useEffect, useReducer } from "react";
import Header from "./Header";
import Loader from "./Loader";
import Main from "./Main";
import StartScreen from "./StartScreen";
import Progress from "./Progress";
import Question from "./Question";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import NextButton from "./NextButton";
import Error from "./Error";

const initalState = {
  questions: [],
  index: 0,
  status: "loading",
  answer: null,
  points: 0,
  highScore: 0,
  timeLeft: null,
};
const ANSWER_TIME = 30;

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, status: "loading" };
    case "resolved":
      return { ...state, questions: action.payload, status: "resolved" };
    case "start":
      return {
        ...state,
        status: "start",
        timeLeft: state.questions.length * ANSWER_TIME,
      };
    case "newAnswer":
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finish",
        highScore:
          state.highScore >= state.points ? state.highScore : state.points,
      };
    case "restart":
      return {
        ...state,
        highScore: state.highScore,
        status: "start",
        index: 0,
        answer: null,
        points: 0,
        timeLeft: state.questions.length * ANSWER_TIME,
      };
    case "tick":
      return { ...state, timeLeft: state.timeLeft - 1 };
    case "error":
      return { ...state, status: "error" };
    default:
      throw new Error("Invalid action type");
  }
}

function App() {
  const [
    { questions, status, index, answer, points, highScore, timeLeft },
    dispatch,
  ] = useReducer(reducer, initalState);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch("http://localhost:4000/questions");
        const data = await response.json();
        dispatch({ type: "resolved", payload: data });
        // console.log(data);
      } catch (error) {
        dispatch({ type: "error" });
      }
    }
    loadData();
  }, []);

  const numQuestions = questions.length;
  const maxPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );
  console.log(status, index, answer);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "resolved" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "start" && (
          <>
            <Progress
              current={index}
              total={numQuestions}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question
              dispatch={dispatch}
              question={questions[index]}
              answer={answer}
            />
            <Footer>
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
              <Timer dispatch={dispatch} timeLeft={timeLeft} />
            </Footer>
          </>
        )}
        {status === "finish" && (
          <FinishScreen
            dispatch={dispatch}
            points={points}
            maxPoints={maxPoints}
            highScore={highScore}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
