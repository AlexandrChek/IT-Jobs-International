import { useMemo } from 'react';
import { experienceFromLabel, experienceIsNotRequired, jobTextareas } from '../../constants';
import PositionAndSalaryOutput from '../output_components/PositionAndSalaryOutput';
import UserProfilePublicLink from '../UserProfilePublicLink';
import LocationOutput from '../output_components/LocationOutput';
import WorkplacesOutput from '../output_components/WorkplacesOutput';
import RelocationOutput from '../output_components/RelocationOutput';
import TotalExperienceOutput from '../output_components/TotalExperienceOutput';
import EnglishLevelOutput from '../output_components/EnglishLevelOutput';
import TextBlockOutput from '../output_components/TextBlockOutput';
import styles from '../../styles/components/public_templates/PublicTemplates.module.css';

const JobPublicTemplate = ({ job, ...rest }) => {
  const experienceFrom = useMemo(() => {
    if (job.experienceFromYears || job.experienceFromMonths) {
      return {
        totalYears: job.experienceFromYears,
        totalMonths: job.experienceFromMonths,
      };
    } else return null;
  }, [job.experienceFromYears, job.experienceFromMonths]);

  return (
    <div {...rest}>
      <h2 className={styles.cvAndJobTitle}>
        <PositionAndSalaryOutput
          position={job.position}
          salary={job.salary}
          className={styles.position}
        />
      </h2>
      <UserProfilePublicLink
        userId={job.companyId}
        userName={job.companyName}
        userType="company"
        className={!job.location ? styles.bigMb : ''}
      />
      {job.location && <LocationOutput className={styles.bigMb} location={job.location} />}
      <div className="flexColumnBox">
        {job.workplaces && (
          <WorkplacesOutput className={styles.nameValueBox} workplaces={job.workplaces} />
        )}
        {job.isRelocationPossible && <RelocationOutput subjectType="job" />}
        {experienceFrom && (
          <TotalExperienceOutput totalExperience={experienceFrom} className={styles.nameValueBox}>
            {experienceFromLabel}
          </TotalExperienceOutput>
        )}
        {job.experienceIsNotRequired && <p>{experienceIsNotRequired}</p>}
        {job.englishLevel && (
          <EnglishLevelOutput level={job.englishLevel} className={styles.nameValueBox} />
        )}
        {jobTextareas.map(
          area =>
            job[area.name] && (
              <TextBlockOutput
                key={area.name}
                newClass={styles.nameValueBox}
                title={area.label}
                textContent={job[area.name]}
              />
            ),
        )}
      </div>
    </div>
  );
};

export default JobPublicTemplate;
