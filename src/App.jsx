import { useEffect, useState } from "react";
import Question from "./Question";
import axios from "axios";
import "./App.css";

function App() {
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [typeOfQuestions, setTypeOfQuestions] = useState({
    questionsNumber: 10,
    category: 21,
    difficulty: "easy",
  });
  const [score, setScore] = useState({
    correctCount: 0,
    currentQuestionIndex: 1,
  });
  useEffect(() => {
    axios
      .get("https://opentdb.com/api_category.php")
      .then((result) => setCategories(result.data.trivia_categories))
      .catch((error) => console.error(error));
  }, []);

  const selectCategory = (category) => {
    const selectedCategory = categories.find(
      (c) => c.name.toLowerCase() === category
    );
    setTypeOfQuestions({ ...typeOfQuestions, category: selectedCategory.id });
  };

  const fetchQuestions = (
    selectedQuestionsNumber,
    selectedCategory,
    selectedDifficulty
  ) => {
    axios
      .get(
        `https://opentdb.com/api.php?amount=${selectedQuestionsNumber}&category=${selectedCategory}&difficulty=${selectedDifficulty}`
      )
      .then((result) => {
        setQuestions(result.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  function getPercentage(correct, total) {
    if (total === 0) return 0;
    return (correct / total) * 100;
  }
  const percent = getPercentage(
    score.correctCount,
    typeOfQuestions.questionsNumber
  );
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
                    typeOfQuestions.questionsNumber + 1,
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
            <Question
              {...questions[score.currentQuestionIndex - 1]}
              updateScore={(correctDelta, questionDelta) =>
                setScore((prev) => {
                  return {
                    correctCount: prev.correctCount + correctDelta,
                    currentQuestionIndex:
                      prev.currentQuestionIndex + questionDelta,
                  };
                })
              }
            />
            {questions[score.currentQuestionIndex] &&
              score.currentQuestionIndex <=
                Number(typeOfQuestions.questionsNumber) && (
                <p className="correct-answers-p">
                  Correct answers:{" "}
                  <span className="correct-answers">{score.correctCount}</span>{" "}
                  / {score.currentQuestionIndex}
                </p>
              )}
          </>
        )}
      </main>
      {isPlaying &&
        score.currentQuestionIndex >
          Number(typeOfQuestions.questionsNumber) && (
          <>
            <div className="overlay"></div>
            <div className="modal">
              <h2 className="heading-secondary">Game Over!</h2>
              <p className="modal-paragraph">
                You answered {""}
                <span>
                  {score.correctCount} / {typeOfQuestions.questionsNumber}
                </span>
                or <span>{percent.toFixed(2)}% </span>questions correctly
              </p>
              <button
                className="btn btn-play-again"
                onClick={() => {
                  setScore({ correctCount: 0, currentQuestionIndex: 1 });
                  setIsPlaying(false);
                  setTypeOfQuestions({
                    questionsNumber: 10,
                    category: 21,
                    difficulty: "easy",
                  });
                }}
              >
                Play again?
              </button>
            </div>
          </>
        )}
    </>
  );
}

export default App;
