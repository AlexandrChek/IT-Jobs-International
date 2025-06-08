import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  totalExperienceLabel,
  zeroTotalWorkExperience,
  emptyWorkItem,
  workProperties,
} from '../constants';
import AddButton from './buttons/AddButton';
import ExperienceItem from './ExperienceItem';
import TotalExperienceOutput from './TotalExperienceOutput';

const WorkExperienceBlock = ({
  initialExperience = [],
  initialTotalExperience = zeroTotalWorkExperience,
}) => {
  const [experience, setExperience] = useState(initialExperience || []);
  const [totalExperience, setTotalExperience] = useState(
    initialTotalExperience || zeroTotalWorkExperience,
  );
  const updatedTotalExperience = useSelector(state => state.totalExperience.totalWorkExperience);

  useEffect(() => {
    setExperience(initialExperience || []);
    setTotalExperience(initialTotalExperience || zeroTotalWorkExperience);
  }, [initialTotalExperience?.totalYears, initialTotalExperience?.totalMonths]);

  useEffect(() => {
    updatedTotalExperience && setTotalExperience(updatedTotalExperience);
  }, [updatedTotalExperience?.totalYears, updatedTotalExperience?.totalMonths]);

  const addEmptyItem = () => {
    setExperience(prev => [...prev, { ...emptyWorkItem }]);
  };

  return (
    <div>
      <h5>Work experience history (in reverse order)</h5>
      {experience.length ? (
        <>
          {experience.map((item, index) => (
            <ExperienceItem key={index} item={item} index={index} properties={workProperties} />
          ))}
          <TotalExperienceOutput totalExperience={totalExperience}>
            {totalExperienceLabel}
          </TotalExperienceOutput>
        </>
      ) : null}
      <AddButton itemName="work experience" onClick={addEmptyItem} />
    </div>
  );
};

export default WorkExperienceBlock;
