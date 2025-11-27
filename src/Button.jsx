const Button = ({ clickAction, type, children, elementClass }) => {
  //const baseClassName = "btn";
  //let aditionalClassName;
  //if(variation === "standard") aditionalClassName = "standard";
  //if(..)
  return (
    <button className={elementClass} type={type} onClick={clickAction}>
      {children}
    </button>
  );
};

export default Button;
