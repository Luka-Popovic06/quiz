const Question = (props) => {
  const { correct_answer, incorrect_answers, question, updateScore } = props;
  if (!question) return <p className="loading-question-p">Loading...</p>;
  if (!incorrect_answers)
    return <p className="loading-answers-p">Loading...</p>;

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const answers = shuffle([...incorrect_answers, correct_answer]);

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
