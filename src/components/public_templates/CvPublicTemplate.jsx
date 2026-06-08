import { useMemo } from 'react';
import { calculateAge } from '../../methods';
import { totalExperienceLabel } from '../../constants';
import PositionAndSalaryOutput from '../output_components/PositionAndSalaryOutput';
import LocationOutput from '../output_components/LocationOutput';
import WorkplacesOutput from '../output_components/WorkplacesOutput';
import RelocationOutput from '../output_components/RelocationOutput';
import SkillsOutput from '../output_components/SkillsOutput';
import TotalExperienceOutput from '../output_components/TotalExperienceOutput';
import ExperienceOutputBlock from '../output_components/ExperienceOutputBlock';
import EnglishLevelOutput from '../output_components/EnglishLevelOutput';
import WebsiteOutput from '../output_components/WebsiteOutput';
import TextBlockOutput from '../output_components/TextBlockOutput';
import styles from '../../styles/components/public_templates/PublicTemplates.module.css';

const CvPublicTemplate = ({ cv, viewType }) => {
  const age = useMemo(() => calculateAge(cv.dateOfBirth), [cv.dateOfBirth]);

  return (
    <div>
      <h2 className={styles.cvAndJobTitle}>
        <PositionAndSalaryOutput
          position={cv.position}
          salary={cv.salary}
          className={styles.position}
        />
      </h2>
      <h4>
        {cv.userName}, {age} years
      </h4>
      <LocationOutput className={styles.bigMb} location={cv.location} />
      <div className={`flexColumnBox ${viewType === 'public' && styles.bigMb}`}>
        {cv.workplaces && (
          <WorkplacesOutput className={styles.nameValueBox} workplaces={cv.workplaces} />
        )}
        {cv.isRelocationPossible && <RelocationOutput subjectType="cv" />}
        {cv.skills && <SkillsOutput skills={cv.skills} className={styles.nameValueBox} />}
        {cv.work && (
          <div>
            <h4 className={styles.experienceTitleInCv}>Work experience</h4>
            <TotalExperienceOutput
              totalExperience={cv.totalWorkExperience}
              className={`${styles.totalExperienceInCv} ${styles.nameValueBox}`}
            >
              {totalExperienceLabel}
            </TotalExperienceOutput>
            <ExperienceOutputBlock experienceArr={cv.work} experienceType="work" />
          </div>
        )}
        {cv.education && (
          <div>
            <h4 className={styles.experienceTitleInCv}>Education</h4>
            <ExperienceOutputBlock experienceArr={cv.education} experienceType="education" />
          </div>
        )}
        {cv.englishLevel && (
          <EnglishLevelOutput level={cv.englishLevel} className={styles.nameValueBox} />
        )}
        {cv.portfolio && (
          <WebsiteOutput
            title="Portfolio:"
            siteUrl={cv.portfolio}
            className={styles.nameValueBox}
          />
        )}
        {cv.additionalInfo && (
          <TextBlockOutput
            newClass={styles.nameValueBox}
            title="Additional information:"
            textContent={cv.additionalInfo}
          />
        )}
      </div>
    </div>
  );
};

export default CvPublicTemplate;
