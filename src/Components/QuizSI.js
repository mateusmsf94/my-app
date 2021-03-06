import React, { useState, useContext, useEffect } from "react";
import { QuizContext } from "../Helpers/Contexts";
import { Questions } from "../Helpers/QuestionBank";
import { ExpectedTranscripts } from "../Helpers/ExpectedTranscript";
import { useSpeechSynthesis } from "react-speech-kit";

function QuizSI() {
  const { score, setScore, setGameState } = useContext(QuizContext);

  const [currQuestion, setCurrQuestion] = useState(0);
  const [optionChosen, setOptionChosen] = useState("");

  const { speak } = useSpeechSynthesis();

  const nextQuestion = () => {
    if (Questions[currQuestion].answer == optionChosen) {
      setScore(score + 1);
    }
    setCurrQuestion(currQuestion + 1);
  };

  const finishQuiz = () => {
    if (Questions[currQuestion].answer == optionChosen) {
      setScore(score + 1);
    }
    setGameState("end screen");
  };

  useEffect(() => {
    speak({ text: ExpectedTranscripts[currQuestion] });
  }, [currQuestion]);

  return (
    <div className="Quiz">
      <div className="options">
        <button className="option" onClick={() => setOptionChosen("A")}>
          {Questions[currQuestion].optionA}
        </button>
        <button className="option" onClick={() => setOptionChosen("B")}>
          {Questions[currQuestion].optionB}
        </button>
        <button className="option" onClick={() => setOptionChosen("C")}>
          {Questions[currQuestion].optionC}
        </button>
        <button className="option" onClick={() => setOptionChosen("D")}>
          {Questions[currQuestion].optionD}
        </button>
      </div>

      {currQuestion == Questions.length - 1 ? (
        <button onClick={finishQuiz}>Finish Quiz</button>
      ) : (
        <button onClick={nextQuestion}> NextQuestion</button>
      )}
    </div>
  );
}

export default QuizSI;
