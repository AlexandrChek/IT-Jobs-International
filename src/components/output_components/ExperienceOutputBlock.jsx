import { useMemo } from 'react';
import { workProperties, educationProperties } from '../../constants';
import styles from '../../styles/components/output_components/ExperienceOutputBlock.module.css';

const ExperienceOutputBlock = ({ experienceArr, experienceType }) => {
  const properties = useMemo(() => {
    return experienceType === 'work' ? { ...workProperties } : { ...educationProperties };
  }, [experienceType]);

  return (
    <div>
      {experienceArr.map((item, index) => (
        <div key={index} className={styles.itemWrapper}>
          <p>
            Period: from {item.from}{' '}
            {!index && item.isStillOngoing ? properties.stillOngoingLabel : `to ${item.to}`}
          </p>
          <p>
            {properties.direction.label}: {item[properties.direction.name]}
          </p>
          <p>
            {properties.organization.label}: {item[properties.organization.name]}
          </p>
          {item[properties.functionsAndAchivements.name] && (
            <p className="largeText">
              {properties.functionsAndAchivements.label}:<br />
              {item[properties.functionsAndAchivements.name]}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ExperienceOutputBlock;
