import styles from '../../styles/components/output_components/WorkplacesOutput.module.css';

const WorkplacesOutput = ({ workplaces, ...rest }) => {
  return (
    <div {...rest}>
      <h5>Acceptable workplaces:</h5>
      <div className={styles.placesWrapper}>
        {workplaces.map((workplace, index, workplaces) => (
          <span key={index}>
            {workplace}
            {workplaces.length > 1 && index < workplaces.length - 1 && '/'}
          </span>
        ))}
      </div>
    </div>
  );
};

export default WorkplacesOutput;
