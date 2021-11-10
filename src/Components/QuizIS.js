import React, { useState, useContext } from "react";
import { QuizContext } from "../Helpers/Contexts";
import { Questions } from "../Helpers/QuestionBank";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { ExpectedTranscripts } from "../Helpers/ExpectedTranscript";

function QuizIS() {
  const { score, setScore, setGameState } = useContext(QuizContext);

  const [currQuestion, setCurrQuestion] = useState(0);
  const [optionChosen, setOptionChosen] = useState("");

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const nextQuestion = () => {
    if (ExpectedTranscripts[currQuestion] === transcript) {
      setScore(score + 1);
    }
    setCurrQuestion(currQuestion + 1);
    resetTranscript();
  };

  const finishQuiz = () => {
    if (Questions[currQuestion].answer == optionChosen) {
      setScore(score + 1);
    }
    setGameState("end screen");
  };
  return (
    <div className="Quiz">
      <h1>{Questions[currQuestion].prompt}</h1>
      <div>
        <p>Microphone: {listening ? "on" : "off"}</p>
        <button onClick={SpeechRecognition.startListening}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <p>{transcript}</p>
      </div>

      {currQuestion == Questions.length - 1 ? (
        <button onClick={finishQuiz}>Finish Quiz</button>
      ) : (
        <button onClick={nextQuestion}> NextQuestion</button>
      )}
    </div>
  );
}

export default QuizIS;
