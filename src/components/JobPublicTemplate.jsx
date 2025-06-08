import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  relocationFrom,
  experienceFromLabel,
  experienceIsNotRequired,
  englishLabel,
  jobTextareas,
} from '../constants';
import WorkplacesOutput from '../components/WorkplacesOutput';
import TotalExperienceOutput from './TotalExperienceOutput';

const JobPublicTemplate = ({ job }) => {
  const experienceFrom = useMemo(() => {
    if (job.experienceFromYears || job.experienceFromMonths) {
      return {
        totalYears: job.experienceFromYears,
        totalMonths: job.experienceFromMonths,
      };
    } else return null;
  }, [job.experienceFromYears, job.experienceFromMonths]);

  return (
    <>
      <h2>
        {job.position}
        {job.salary && `, ${job.salary}$`}
      </h2>
      <Link to={`/company_profile/${job.companyId}/public`}>
        <h3>{job.companyName}</h3>
      </Link>
      {job.country && (
        <p>
          {job.country}
          {job.city && `, ${job.city}`}
        </p>
      )}
      {job.workplaces && <WorkplacesOutput workplaces={job.workplaces} />}
      {job.isRelocationPossible && <p>{relocationFrom}</p>}
      {experienceFrom && (
        <TotalExperienceOutput totalExperience={experienceFrom}>
          {experienceFromLabel}
        </TotalExperienceOutput>
      )}
      {job.experienceIsNotRequired && <p>{experienceIsNotRequired}</p>}
      {job.englishLevel && (
        <h5>
          {englishLabel} {job.englishLevel}
        </h5>
      )}
      {jobTextareas.map(
        area =>
          job[area.name] && (
            <div key={area.name}>
              <h5>{area.label}</h5>
              <p className="bigText">{job[area.name]}</p>
            </div>
          ),
      )}
    </>
  );
};

export default JobPublicTemplate;
