import { calculateAge } from '../methods';
import { relocationTo } from '../constants';
import WorkplacesOutput from './WorkplacesOutput';
import TotalExperienceOutput from './TotalExperienceOutput';
import ExperienceOutputBlock from './ExperienceOutputBlock';

const CvPublicTemplate = ({ profile }) => {
  const age = calculateAge(profile.dateOfBirth);

  return (
    <>
      <h2>
        {profile.position}
        {profile.salary && `, ${profile.salary}`}
      </h2>
      <h3>
        {profile.userName}, {age} years
      </h3>
      <p>{profile.location}</p>
      {profile.workplaces && <WorkplacesOutput workplaces={profile.workplaces} />}
      {profile.isRelocationPossible && <p>{relocationTo}</p>}
      {profile.skills && (
        <>
          <h5>Skills:</h5>
          <p>{profile.skills}</p>
        </>
      )}
      {profile.work && (
        <>
          <h4>Work experience</h4>
          <TotalExperienceOutput totalExperience={profile.totalWorkExperience} />
          <ExperienceOutputBlock experienceArr={profile.work} experienceType="work" />
        </>
      )}
      {profile.education && (
        <>
          <h4>Educayion</h4>
          <ExperienceOutputBlock experienceArr={profile.education} experienceType="education" />
        </>
      )}
      {profile.englishLevel && <h5>English level: {profile.englishLevel}</h5>}
      {profile.portfolio && (
        <>
          <h5>Portfolio:</h5>
          <a href={profile.portfolio} target="_blank">
            {profile.portfolio}
          </a>
        </>
      )}
      {profile.additionalInfo && (
        <>
          <h5>Additional information:</h5>
          <p>{profile.additionalInfo}</p>
        </>
      )}
    </>
  );
};

export default CvPublicTemplate;
