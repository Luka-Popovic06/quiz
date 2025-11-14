import { useEffect, useState } from "react";
import Question from "./Question";
import axios from "axios";
import "./App.css";

function App() {
  return (
    <>
      <main className="container">
        {!isPlaying ? (
          <>
            <h1 className="quiz-title">Quiz setup</h1>
            <form className="setup-form">
              <div className="form-section">
                <label htmlFor="number-of-questions-input">
                  Number of questions
                </label>
                <input
                  type="number"
                  name="number-of-questions-input"
                  defaultValue={10}
                  min={1}
                  max={20}
                  onChange={(e) =>
                    setTypeOfQuestions({
                      ...typeOfQuestions,
                      questionsNumber: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-section">
                <label htmlFor="category">Category</label>
                <select
                  name="category"
                  onChange={(e) => selectCategory(e.target.value)}
                >
                  <option value="sports">sports</option>
                  <option value="art">art</option>
                  <option value="geography">geography</option>
                  <option value="mythology">mythology</option>
                </select>
              </div>
              <div className="form-section">
                <label htmlFor="difficulty">Difficulty</label>
                <select
                  name="difficulty"
                  onChange={(e) =>
                    setTypeOfQuestions({
                      ...typeOfQuestions,
                      difficulty: e.target.value,
                    })
                  }
                >
                  <option value="easy">easy</option>
                  <option value="medium">medium</option>
                  <option value="hard">hard</option>
                </select>
              </div>
              <button
                type="button"
                onClick={() => {
                  fetchQuestions(
                    typeOfQuestions.questionsNumber,
                    typeOfQuestions.category,
                    typeOfQuestions.difficulty
                  );
                  setIsPlaying(true);
                }}
              >
                Start playing!
              </button>
            </form>
          </>
        ) : (
          <>
            <Question {...questions[0]} />
          </>
        )}
      </main>
      {numberOfQuestion === 10 && (
        <>
          <div className="overlay"></div>
          <div class="modal">
            <h2 class="heading-secondary">Game Over!</h2>
            <p class="modal-paragraph">
              You answered <span>0 / 10</span> or <span>0% </span>questions
              correctly
            </p>
            <button class="btn btn-play-again">Play again?</button>
          </div>
        </>
      )}
    </>
  );
}

export default App;
