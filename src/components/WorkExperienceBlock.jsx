import { useState } from 'react';
import { useSelector } from 'react-redux';
import { emptyWorkItem, workProperties } from '../constants';
import AddButton from './AddButton';
import ExperienceItem from './ExperienceItem';

const WorkExperienceBlock = ({ initialExperience = [] }) => {
  const [experience, setExperience] = useState(initialExperience);
  const { totalYears, totalMonths } = useSelector(state => state.cvForm.totalWorkExperience);

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
            Total work experience: {totalYears} years, {totalMonths} months
          </p>
        </>
      )}
    </div>
  );
};

export default WorkExperienceBlock;
