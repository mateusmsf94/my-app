import React, { useContext } from "react";
import { QuizContext } from "../Helpers/Contexts";
import "../App.css";

export default function MainMenu() {
  const { gameState, setGameState } = useContext(QuizContext);
  return (
    <div className="Menu">
      <div className="options">
        <button
          className="option"
          onClick={() => {
            setGameState("quizii");
          }}
        >
          quiz imagem imagem
        </button>
        <button
          className="option"
          onClick={() => {
            setGameState("quizis");
          }}
        >
          quiz imagem som
        </button>
        <button className="option" onClick={() => setGameState("quizsi")}>
          quiz som imagem
        </button>
        <button className="option">quiz 4</button>
      </div>
      <button
        onClick={() => {
          setGameState("quiz");
        }}
      >
        Start Quiz
      </button>
    </div>
  );
}
