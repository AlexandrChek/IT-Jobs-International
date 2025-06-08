const WorkplacesOutput = ({ workplaces }) => {
  return (
    <>
      <h5>Acceptable workplaces:</h5>
      <div>
        {workplaces.map((workplace, index, workplaces) => (
          <span key={index}>
            {workplace}
            {workplaces.length > 1 && index < workplaces.length - 1 && '/'}
          </span>
        ))}
      </div>
    </>
  );
};

export default WorkplacesOutput;
