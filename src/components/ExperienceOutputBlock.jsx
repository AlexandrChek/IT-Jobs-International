import { workProperties, educationProperties } from '../constants';

const ExperienceOutputBlock = ({ experienceArr, experienceType }) => {
  const properties = experienceType === 'work' ? { ...workProperties } : { ...educationProperties };

  return (
    <>
      {experienceArr.map((item, index) => {
        <div key={index}>
          <p>
            From {item.from}{' '}
            {!index && item.isStillOngoing ? properties.stillOngoing.label : `to ${item.to}`}
          </p>
          <p>
            {properties.direction.label}: {item[properties.direction.name]}
          </p>
          <p>
            {properties.organization.label}: {item[properties.organization.name]}
          </p>
          {Object.keys(item).includes(properties.functionsAndAchivements) && (
            <p>
              {properties.functionsAndAchivements.label}:{' '}
              {item[properties.functionsAndAchivements.name]}
            </p>
          )}
        </div>;
      })}
    </>
  );
};

export default ExperienceOutputBlock;
