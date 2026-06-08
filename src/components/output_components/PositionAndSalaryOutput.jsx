const PositionAndSalaryOutput = ({ position, salary, ...rest }) => {
  return (
    <p {...rest}>
      {position}
      {salary && `, ${salary}$`}
    </p>
  );
};

export default PositionAndSalaryOutput;
