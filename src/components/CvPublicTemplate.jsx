import { useMemo } from 'react';
import { calculateAge } from '../methods';
import { relocationTo, totalExperienceLabel } from '../constants';
import WorkplacesOutput from './WorkplacesOutput';
import TotalExperienceOutput from './TotalExperienceOutput';
import ExperienceOutputBlock from './ExperienceOutputBlock';

const CvPublicTemplate = ({ cv }) => {
  const age = useMemo(() => calculateAge(cv.dateOfBirth), [cv.dateOfBirth]);

  return (
    <>
      <h2>
        {cv.position}
        {cv.salary && `, ${cv.salary}$`}
      </h2>
      <h3>
        {cv.userName}, {age} years
      </h3>
      <p>{cv.location}</p>
      {cv.workplaces && <WorkplacesOutput workplaces={cv.workplaces} />}
      {cv.isRelocationPossible && <p>{relocationTo}</p>}
      {cv.skills && (
        <>
          <h5>Skills:</h5>
          <p>{cv.skills}</p>
        </>
      )}
      {cv.work && (
        <>
          <h4>Work experience</h4>
          <TotalExperienceOutput totalExperience={cv.totalWorkExperience}>
            {totalExperienceLabel}
          </TotalExperienceOutput>
          <ExperienceOutputBlock experienceArr={cv.work} experienceType="work" />
        </>
      )}
      {cv.education && (
        <>
          <h4>Education</h4>
          <ExperienceOutputBlock experienceArr={cv.education} experienceType="education" />
        </>
      )}
      {cv.englishLevel && <h5>English level: {cv.englishLevel}</h5>}
      {cv.portfolio && (
        <>
          <h5>Portfolio:</h5>
          <a href={cv.portfolio} target="_blank">
            {cv.portfolio}
          </a>
        </>
      )}
      {cv.additionalInfo && (
        <>
          <h5>Additional information:</h5>
          <p className="bigText">{cv.additionalInfo}</p>
        </>
      )}
    </>
  );
};

export default CvPublicTemplate;
