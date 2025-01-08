// import DateCounter from "./DateCounter";
import { useEffect, useReducer } from "react";
import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Progress from "./Progress";
import Question from "./Question";
import NextButton from "./NextButton";
import Main from "./Main";

const initalState = {
  questions: [],
  index: 0,
  status: "loading",
  answer: null,
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, status: "loading" };
    case "resolved":
      return { ...state, questions: action.payload, status: "resolved" };
    case "start":
      return { ...state, status: "start" };
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
    case "error":
      return { ...state, status: "error" };
    default:
      throw new Error("Invalid action type");
  }
}

function App() {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    initalState
  );

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
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton dispatch={dispatch} answer={answer} />
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
