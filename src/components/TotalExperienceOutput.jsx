import { useMemo } from 'react';

const TotalExperienceOutput = ({ totalExperience, children }) => {
  const { years, months } = useMemo(
    () => ({
      years: totalExperience.totalYears ? `${totalExperience.totalYears} year(s)` : null,
      months: totalExperience.totalMonths ? `${totalExperience.totalMonths} month(s)` : null,
    }),
    [totalExperience.totalYears, totalExperience.totalMonths],
  );

  return (
    <h5>
      {children} {years}
      {years && months ? ', ' : null}
      {months}
    </h5>
  );
};

export default TotalExperienceOutput;
