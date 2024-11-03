import { useState } from 'react';
import { emptyEducationItem, educationProperties } from '../constants';
import AddButton from './buttons/AddButton';
import ExperienceItem from './ExperienceItem';

const EducationBlock = ({ initialEducation = [] }) => {
  const [education, setEducation] = useState(initialEducation);

  const addEmptyItem = () => {
    setEducation(prev => [emptyEducationItem, ...prev]);
  };

  return (
    <div>
      <h5>Education</h5>
      {education.length && (
        <>
          {education.map((item, index) => (
            <div key={index}>
              <ExperienceItem item={item} index={index} properties={educationProperties} />
            </div>
          ))}
        </>
      )}
      <AddButton itemName="education details" onClick={addEmptyItem} />
    </div>
  );
};

export default EducationBlock;
