const TotalExperienceOutput = ({ totalExperience }) => {
  return (
    <h5>
      Total work experience: {totalExperience.totalYears} years
      {totalExperience.totalMonths && `, ${profile.totalWorkExperience.totalMonths} months`}
    </h5>
  );
};

export default TotalExperienceOutput;
