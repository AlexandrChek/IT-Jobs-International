import PhoneInput from './PhoneInput';
import EmailInput from './EmailInput';
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
