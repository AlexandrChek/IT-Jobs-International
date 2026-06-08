const SubmitButton = ({ children, newClass = null, ...rest }) => {
  return (
    <button type="submit" className={`standardButton ${newClass}`} {...rest}>
      {children}
    </button>
  );
};

export default SubmitButton;
