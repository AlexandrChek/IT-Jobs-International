import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { totalExperienceLabel, zeroTotalWorkExperience, emptyWorkItem } from '../constants';
import AddButton from './buttons/AddButton';
import ExperienceList from './ExperienceList';
import TotalExperienceOutput from './output_components/TotalExperienceOutput';
import CrossButton from './buttons/CrossButton';
import styles from '../styles/components/WorkExperienceBlock.module.css';

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
  }, [JSON.stringify(initialTotalExperience)]);

  useEffect(() => {
    updatedTotalExperience && setTotalExperience(updatedTotalExperience);
  }, [JSON.stringify(updatedTotalExperience)]);

  const addEmptyItem = () => {
    setExperience(prev => [emptyWorkItem, ...prev]);
  };

  return (
    <div className="flexColumnBox">
      <h5>Work experience history (in reverse order)</h5>
      {experience.length ? (
        <>
          <ExperienceList
            experienceType="work"
            experienceArr={experience}
            updateExperience={setExperience}
          />
          <TotalExperienceOutput totalExperience={totalExperience} className={styles.totalExpBox}>
            {totalExperienceLabel}
          </TotalExperienceOutput>
        </>
      ) : null}
      <AddButton addItem={addEmptyItem} itemName="work experience" />
    </div>
  );
};

export default WorkExperienceBlock;
