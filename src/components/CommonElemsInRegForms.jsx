import PhoneInput from './specific_inputs/PhoneInput';
import EmailInput from './specific_inputs/EmailInput';
import RegFormPassword from './specific_inputs/RegFormPassword';
import PrivacyAcceptanceCheckbox from './specific_inputs/PrivacyAcceptanceCheckbox';
import SubmitButton from './buttons/SubmitButton';

const CommonElemsInRegForms = ({ initialPhone = '', initialEmail = '', userId }) => {
  return (
    <>
      <PhoneInput initialPhone={initialPhone} isRequired={true} />
      <EmailInput initialEmail={initialEmail} isRequired={true} />
      <RegFormPassword />
      <PrivacyAcceptanceCheckbox />
      <div>
        <SubmitButton>{userId ? 'Save' : 'Sign Up'}</SubmitButton>
      </div>
    </>
  );
};

export default CommonElemsInRegForms;
