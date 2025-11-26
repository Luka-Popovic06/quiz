const Select = (props) => {
  const { options, handleChange, name } = props;
  return (
    <select
      name={name}
      onChange={(e) => {
        handleChange(e);
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
