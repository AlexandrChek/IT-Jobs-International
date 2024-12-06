import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { emptyWorkItem, workProperties } from '../constants';
import AddButton from './buttons/AddButton';
import ExperienceItem from './ExperienceItem';

const WorkExperienceBlock = ({ initialExperience = [], initialTotalExperience = null }) => {
  const [experience, setExperience] = useState(initialExperience);
  const [totalExperience, setTotalExperience] = useState(initialTotalExperience);
  const updatedTotalExperience = useSelector(state => state.cvForm.totalWorkExperience);

  useEffect(() => {
    if (updatedTotalExperience) {
      setTotalExperience(updatedTotalExperience);
    }
  }, [updatedTotalExperience]);

  const addEmptyItem = () => {
    setExperience(prev => [emptyWorkItem, ...prev]);
  };

  return (
    <div>
      <h5>Work experience history (in reverse order)</h5>
      <AddButton itemName="work experience" onClick={addEmptyItem} />
      {experience.length && (
        <>
          {experience.map((item, index) => (
            <div key={index}>
              <ExperienceItem item={item} index={index} properties={workProperties} />
            </div>
          ))}
          <p>
            Total work experience: {totalExperience?.totalYears || 0} years,{' '}
            {totalExperience?.totalMonths || 0} months
          </p>
        </>
      )}
    </div>
  );
};

export default WorkExperienceBlock;
