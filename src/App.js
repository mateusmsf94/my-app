import "./App.css";
import React, { useState, useContext } from "react";
import MainMenu from "./Components/MainMenu";
import Quiz from "./Components/Quiz";
import EndScreen from "./Components/EndScreen";

import { QuizContext } from "./Helpers/Contexts";
import QuizII from "./Components/QuizII";
import QuizIS from "./Components/QuizIS";
import QuizSI from "./Components/QuizSI";

function App() {
  const [gameState, setGameState] = useState("menu");
  const [score, setScore] = useState(0);
  return (
    <div className="App">
      <h1>Quiz App</h1>

      <QuizContext.Provider
        value={{ gameState, setGameState, score, setScore }}
      >
        {gameState === "menu" && <MainMenu />}
        {gameState === "quiz" && <Quiz />}
        {gameState === "quizii" && <Quiz />}
        {gameState === "quizis" && <QuizIS />}
        {gameState === "quizsi" && <QuizSI />}
        {gameState === "end screen" && <EndScreen />}
      </QuizContext.Provider>
    </div>
  );
}

export default App;
