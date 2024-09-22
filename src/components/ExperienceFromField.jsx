import MyInput from './MyInput';
import MySelect from './MySelect';
import { experienceUnits, experienceFromLabel } from '../constants';

const ExperienceFromField = ({ initialExperience = '', initialUnit = '' }) => {
  return (
    <div>
      <label htmlFor="experienceFrom">{experienceFromLabel}</label>
      <MyInput
        id="experienceFrom"
        type="number"
        name="experienceFrom"
        initialValue={initialExperience}
      />
      <MySelect
        name="experienceUnit"
        options={experienceUnits}
        initialValue={initialUnit || experienceUnits[0]}
      />
    </div>
  );
};

export default ExperienceFromField;
