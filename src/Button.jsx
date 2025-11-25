const Button = ({
  variation,
  text,
  startGame,
  nextQuestion,
  finishGame,
  type,
}) => {
  const handleClick = () => {
    if (variation === "start") startGame();
    else if (variation === "next") nextQuestion();
    else finishGame();
  };
  //react chealdren prop
  return (
    <button
      className={
        variation === "next"
          ? "nex-question-btn"
          : variation === "finish"
          ? "btn btn-play-again"
          : ""
      }
      type={type}
      onClick={handleClick}
    >
      {variation === "next"
        ? "Next question"
        : variation === "finish"
        ? "Play again?"
        : "Start playing!"}
    </button>
  );
};

export default Button;
