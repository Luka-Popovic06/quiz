const Select = (props) => {
  const { options, setDifficulty, setCategory } = props;

  return (
    <select
      name={options[0].value === "easy" ? "difficulty" : "category"}
      onChange={(e) => {
        options[0].value === "easy" ? setDifficulty(e) : setCategory(e);
      }}
    >
      {options.map((option) => {
        return (
          <option key={option.id} value={option.value}>
            {option.value}
          </option>
        );
      })}
    </select>
  );
};
export default Select;
