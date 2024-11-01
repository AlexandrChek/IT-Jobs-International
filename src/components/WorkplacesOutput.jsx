const WorkplacesOutput = ({ workplaces }) => {
  return (
    <>
      <h5>Acceptable workplaces:</h5>
      {workplaces.map((workplace, index, workplaces) => (
        <p key={index}>
          {workplace}
          {workplaces.length > 1 && index < workplaces.length - 1 && '/'}
        </p>
      ))}
    </>
  );
};

export default WorkplacesOutput;
