const Question = (props) => {
  const { correct_answer, incorrect_answers, question, updateScore } = props;
  if (!question) return <p className="loading-question-p">Loading...</p>;
  if (!incorrect_answers)
    return <p className="loading-answers-p">Loading...</p>;

  const answers = [...incorrect_answers, correct_answer];
  answers.sort(() => Math.random() - 0.5);
  const findCorectAnser = (anser) => {
    if (anser === correct_answer) {
      updateScore(1, 1);
    } else {
      updateScore(0, 1);
    }
  };

  return (
    <>
      <p className="question">{question}</p>
      <div className="answers-box">
        {answers &&
          answers.map((ans, index) => (
            <button
              key={index}
              type="button"
              onClick={() => findCorectAnser(ans)}
            >
              {ans}
            </button>
          ))}
      </div>
      <button
        type="button"
        className="nex-question-btn"
        onClick={() => updateScore(0, 1)}
      >
        Next question
      </button>
    </>
  );
};
export default Question;
