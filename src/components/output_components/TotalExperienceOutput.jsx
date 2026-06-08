import { useMemo } from 'react';
import styles from '../../styles/components/output_components/TotalExperienceOutput.module.css';

const TotalExperienceOutput = ({ totalExperience, children, ...rest }) => {
  const { years, months } = useMemo(
    () => ({
      years: totalExperience.totalYears ? `${totalExperience.totalYears} year(s)` : null,
      months: totalExperience.totalMonths ? `${totalExperience.totalMonths} month(s)` : null,
    }),
    [totalExperience.totalYears, totalExperience.totalMonths],
  );

  return (
    <div {...rest}>
      <h5>{children}</h5>
      <p className={styles.period}>
        {years}
        {years && months ? ', ' : null}
        {months}
      </p>
    </div>
  );
};

export default TotalExperienceOutput;
