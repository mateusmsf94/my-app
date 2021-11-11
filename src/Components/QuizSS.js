import React, { useState, useContext, useEffect } from "react";
import { QuizContext } from "../Helpers/Contexts";
import { ExpectedTranscripts } from "../Helpers/ExpectedTranscript";
import { useSpeechSynthesis } from "react-speech-kit";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Questions } from "../Helpers/QuestionBank";

function QuizSS() {
  const { score, setScore, setGameState } = useContext(QuizContext);

  const [currQuestion, setCurrQuestion] = useState(0);
  const [optionChosen, setOptionChosen] = useState("");

  const { speak } = useSpeechSynthesis();

  const {
    transcript,
    listening,
    resetTranscript,
    //browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    speak({ text: ExpectedTranscripts[currQuestion] });
  }, [currQuestion]);

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

export default QuizSS;
