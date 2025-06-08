import { useMemo } from 'react';
import { workProperties, educationProperties } from '../constants';

const ExperienceOutputBlock = ({ experienceArr, experienceType }) => {
  const properties = useMemo(() => {
    return experienceType === 'work' ? { ...workProperties } : { ...educationProperties };
  }, [experienceType]);

  return (
    <>
      {experienceArr.map((item, index) => (
        <div key={index}>
          <p>
            From {item.from}{' '}
            {!index && item.isStillOngoing ? properties.stillOngoingLabel : `to ${item.to}`}
          </p>
          <p>
            {properties.direction.label}: {item[properties.direction.name]}
          </p>
          <p>
            {properties.organization.label}: {item[properties.organization.name]}
          </p>
          {Object.keys(item).includes(properties.functionsAndAchivements.name) && (
            <p className="bigText">
              {properties.functionsAndAchivements.label}:<br />
              {item[properties.functionsAndAchivements.name]}
            </p>
          )}
        </div>
      ))}
    </>
  );
};

export default ExperienceOutputBlock;
