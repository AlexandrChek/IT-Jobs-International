import { useDispatch } from 'react-redux';
import { turnOnExperienceUpdate } from '../features/sync/totalExperienceSlice';
import { workProperties, educationProperties } from '../constants';
import ExperienceItem from './ExperienceItem';
import CrossButton from './buttons/CrossButton';
import styles from '../styles/components/ExperienceList.module.css';

const ExperienceList = ({ experienceType, experienceArr, updateExperience }) => {
  const dispatch = useDispatch();

  const delExperienceItem = index => {
    updateExperience(experienceArr.filter((_, i) => i !== index));
    experienceType === 'work' && dispatch(turnOnExperienceUpdate());
  };

  return (
    <>
      {experienceArr.map((item, index) => (
        <div key={index} className={styles.experienceItemBox}>
          <ExperienceItem
            item={item}
            index={index}
            properties={experienceType === 'work' ? workProperties : educationProperties}
          />
          <CrossButton handlerArg={index} crossClickHandler={delExperienceItem} title="Delete" />
        </div>
      ))}
    </>
  );
};

export default ExperienceList;
