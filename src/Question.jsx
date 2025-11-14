import { useEffect } from "react";
const Question = (props) => {
  return (
    <>
      <p className="correct-answers-p">
        Correct answers: <span className="correct-answers">0</span> /10
      </p>
      <p className="question">Who won the 2015 Formula 1 World Championship?</p>
      <div className="answers-box">
        {answers &&
          answers.map((ans, index) => (
            <button key={index} type="button">
              {ans}
            </button>
          ))}
      </div>
      <button type="button" className="nex-question-btn">
        Next question
      </button>
    </>
  );
};
export default Question;
