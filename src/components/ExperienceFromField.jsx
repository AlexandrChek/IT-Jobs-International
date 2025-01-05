import MyInput from './inputs/MyInput';
import { experienceFromLabel, requiredExperienceProps } from '../constants';

const ExperienceFromField = props => {
  return (
    <div>
      <h5>{experienceFromLabel}</h5>
      {requiredExperienceProps.map(item => (
        <label key={item.name}>
          <MyInput type="number" name={item.name} initialValue={props[item.name] || ''} />
          {item.label}
        </label>
      ))}
    </div>
  );
};

export default ExperienceFromField;
