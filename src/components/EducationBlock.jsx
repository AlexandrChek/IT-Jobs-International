import { useState, useEffect } from 'react';
import { emptyEducationItem, educationProperties } from '../constants';
import AddButton from './buttons/AddButton';
import ExperienceItem from './ExperienceItem';

const EducationBlock = ({ initialEducation = [] }) => {
  const [education, setEducation] = useState(initialEducation || []);

  useEffect(() => setEducation(initialEducation || []), [initialEducation?.length]);

  const addEmptyItem = () => {
    setEducation(prev => [emptyEducationItem, ...prev]);
  };

  return (
    <div>
      <h5>Education</h5>
      {education.length ? (
        <>
          {education.map((item, index) => (
            <div key={index}>
              <ExperienceItem item={item} index={index} properties={educationProperties} />
            </div>
          ))}
        </>
      ) : null}
      <AddButton itemName="education details" onClick={addEmptyItem} />
    </div>
  );
};

export default EducationBlock;
