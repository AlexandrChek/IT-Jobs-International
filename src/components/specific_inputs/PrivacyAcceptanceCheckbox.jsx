import { privacyLink } from '../../constantLinks';
import MyCheckbox from '../inputs/MyCheckbox';

const PrivacyAcceptanceCheckbox = () => {
  return (
    <label>
      <MyCheckbox name="privacyAcceptance" initialState={true} required /> I accept the{' '}
      {privacyLink} terms*.
    </label>
  );
};

export default PrivacyAcceptanceCheckbox;
