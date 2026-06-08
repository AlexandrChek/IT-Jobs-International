import MyInput from '../inputs/MyInput';
import InputBox from '../InputBox';
import { experienceFromLabel, requiredExperienceProps } from '../../constants';
import styles from '../../styles/components/specific_inputs/ExperienceFromField.module.css';

const ExperienceFromField = props => {
  return (
    <div className={styles.experienceFromBox}>
      <p className={styles.title}>{experienceFromLabel}</p>
      <div className={styles.experienceInputBox}>
        {requiredExperienceProps.map(item => (
          <InputBox key={item.name} id={item.name} startLabel={item.label}>
            <MyInput
              type="number"
              id={item.name}
              name={item.name}
              initialValue={props[item.name] || ''}
              width="min(calc(100px + 6vw), 150px)"
            />
          </InputBox>
        ))}
      </div>
    </div>
  );
};

export default ExperienceFromField;
