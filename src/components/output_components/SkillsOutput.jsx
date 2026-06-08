const SkillsOutput = ({ skills, ...rest }) => {
  return (
    <div {...rest}>
      <h5>Skills:</h5>
      <p>{skills}</p>
    </div>
  );
};

export default SkillsOutput;
