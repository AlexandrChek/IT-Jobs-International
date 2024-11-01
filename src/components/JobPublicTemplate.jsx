import { Link } from 'react-router-dom';
import {
  relocationFrom,
  experienceFromLabel,
  experienceIsNotRequired,
  englishLabel,
  jobTextareas,
} from '../constants';
import WorkplacesOutput from '../components/WorkplacesOutput';

const JobPublicTemplate = ({ job }) => {
  const filteredTextareas = jobTextareas.filter(area => job[area.name] !== undefined);

  return (
    <>
      <h2>
        {job.position}
        {job.salary && `, ${job.salary}`}
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
      {job.experienceFrom && (
        <h5>
          {experienceFromLabel} {job.experienceFrom} {job.experienceUnit}
        </h5>
      )}
      {job.experienceIsNotRequired && <p>{experienceIsNotRequired}</p>}
      {job.englishLevel && (
        <h5>
          {englishLabel} {job.englishLevel}
        </h5>
      )}
      {filteredTextareas.map(area => (
        <div key={area.name}>
          <h5>{area.label}</h5>
          <p>{job[area.name]}</p>
        </div>
      ))}
    </>
  );
};

export default JobPublicTemplate;
