import MyCheckbox from './inputs/MyCheckbox';
import { experienceIsNotRequired } from '../constants';

const ExperienceIsNotRequiredCheckbox = ({ initialState = '' }) => {
  return (
    <label>
      <MyCheckbox name="experienceIsNotRequired" initialState={initialState} />
      {experienceIsNotRequired}
    </label>
  );
};

export default ExperienceIsNotRequiredCheckbox;
