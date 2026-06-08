import { useState, useEffect } from 'react';
import { emptyEducationItem } from '../constants';
import AddButton from './buttons/AddButton';
import ExperienceList from './ExperienceList';

const EducationBlock = ({ initialEducation = [] }) => {
  const [education, setEducation] = useState(initialEducation || []);

  useEffect(() => setEducation(initialEducation || []), [initialEducation?.length]);

  const addEmptyItem = () => {
    setEducation(prev => [...prev, emptyEducationItem]);
  };

  return (
    <div className="flexColumnBox">
      <h5>Education</h5>
      {education.length ? (
        <ExperienceList
          experienceType="education"
          experienceArr={education}
          updateExperience={setEducation}
        />
      ) : null}
      <AddButton addItem={addEmptyItem} itemName="education details" />
    </div>
  );
};

export default EducationBlock;
