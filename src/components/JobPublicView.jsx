import { Link } from 'react-router-dom';
import { relocationFrom, experienceFromLabel, experienceIsNotRequired, englishLabel, jobTextareas } from '../constants';

const JobPublicView = ({job}) => {
    const filteredTextareas = jobTextareas.filter(area => job.hasOwnProperty(area.name));

    return (
        <>
            <h2>
                {job.levels && job.levels.map((level, index, levels) => (
                    <>{level}{levels.length > 1 && index < levels.length - 1 && '/'}</>
                ))}
                {job.position}
                {job.salary && job.salary}
            </h2>
            <Link to={`/company_profile/${job.companyId}/public`}>
                <h3>{job.companyName}</h3>
            </Link>
            {job.country &&
                <p>{job.country}{job.city && `, ${job.city}`}</p>
            }
            {job.workplaces && job.workplaces.map((workplace, index, workplaces) => (
                <h5>
                    Workplace: {workplace}{workplaces.length > 1 && index < workplaces.length - 1 && '/'}
                </h5>
            ))}
            {job.isRelocationPossible && <p>{relocationFrom}</p>}
            {job.experienceFrom && 
                <h5>{experienceFromLabel} {job.experienceFrom} {job.experienceUnit}</h5>
            }
            {job.isExperienceRequired && <p>{experienceIsNotRequired}</p>}
            {job.englishLevel &&
                <h5>{englishLabel} {job.englishLevel}</h5>
            }
            {filteredTextareas.map(area => (
                <div key={area.name}>
                    <h5>{area.label}</h5>
                    <p>{job[area.name]}</p>
                </div>
            ))}
        </>
    );
};

export default JobPublicView;