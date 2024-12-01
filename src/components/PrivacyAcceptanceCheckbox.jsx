import { Link } from 'react-router-dom';
import MyCheckbox from './inputs/MyCheckbox';

const PrivacyAcceptanceCheckbox = () => {
  const privacyLink = <Link to="/privacy">privacy</Link>;

  return (
    <label>
      <MyCheckbox name="privacyAcceptance" initialState={true} required /> I accept the{' '}
      {privacyLink} terms.
    </label>
  );
};

export default PrivacyAcceptanceCheckbox;
