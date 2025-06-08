import PhoneInput from './inputs/PhoneInput';
import EmailInput from './inputs/EmailInput';
import RegFormPassword from './RegFormPassword';
import PrivacyAcceptanceCheckbox from './PrivacyAcceptanceCheckbox';

const CommonFieldsInRegForms = ({ initialPhone = '', initialEmail = '' }) => {
  return (
    <>
      <PhoneInput initialPhone={initialPhone} isRequired={true} />
      <EmailInput initialEmail={initialEmail} />
      <RegFormPassword />
      <PrivacyAcceptanceCheckbox />
    </>
  );
};

export default CommonFieldsInRegForms;
