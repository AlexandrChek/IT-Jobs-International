import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import useFetchRegData from '../hooks/useFetchRegData';
import useSaveRegData from '../hooks/useSaveRegData';
import useShowEmailExistModal from '../hooks/useShowEmailExistModal';
import useClearSignUpErrors from '../hooks/useClearSignUpErrors';
import { closeModal } from '../features/sync/modalSlice';
import { clearEmailExist } from '../features/async/userRegDataSlice';
import { logInErrorMessage } from '../constants';
import RegistrationTitle from '../components/RegistrationTitle';
import Loading from '../components/Loading';
import CompanyNameInput from '../components/CompanyNameInput';
import CountryCityInputs from '../components/CountryCityInputs';
import CommonFieldsInRegForms from '../components/CommonFieldsInRegForms';
import SignUpButton from '../components/buttons/SignUpButton';
import Modal from '../components/modals/Modal';
import ErrorModal from '../components/modals/ErrorModal';
import styles from '../styles/pages/SignUpCompany.module.css';

const SignUpCompany = () => {
  const dispatch = useDispatch();
  const clearSignUpErrors = useClearSignUpErrors();
  const { regData, pending, error, emailDoesAlreadyExist } = useSelector(
    state => state.userRegData,
  );
  const logInError = useSelector(state => state.auth.error);
  const { doPasswordsMatch } = useSelector(state => state.passwordsMatch);
  const form = useRef();
  const { companyid } = useParams() || {};
  const { saveData, savingMessage } = useSaveRegData();
  const message = emailDoesAlreadyExist || savingMessage;

  useFetchRegData(companyid, 'company');

  useShowEmailExistModal(emailDoesAlreadyExist, 'SignUpCompany');

  const handleSubmit = e => {
    e.preventDefault();

    if (doPasswordsMatch) {
      const formData = new FormData(form.current);
      const url = companyid ? `/edit/company_reg_data/${companyid}` : '/sign_up/company';

      saveData({ url, formData, userType: 'company' });
    }
  };

  const closeInfoModal = () => {
    dispatch(closeModal());
    runClearEmailExist();
  };

  const runClearEmailExist = () => {
    emailDoesAlreadyExist && dispatch(clearEmailExist());
  };

  return (
    <div className="routesWrapper">
      <RegistrationTitle />
      {pending && <Loading />}
      <form ref={form} onSubmit={handleSubmit}>
        <CompanyNameInput initialValue={regData?.companyName} />
        <fieldset>
          <legend>Location of the main office</legend>
          <CountryCityInputs
            initialCountry={regData?.country}
            initialCity={regData?.city}
            areRequired={true}
          />
        </fieldset>
        <CommonFieldsInRegForms initialPhone={regData?.phone} initialEmail={regData?.email} />
        <SignUpButton userId={companyid} />
      </form>
      <Modal
        modalNameProp="SignUpCompany"
        message={message}
        actionAfterClickOnBackdrop={runClearEmailExist}
      >
        <button onClick={closeInfoModal}>Close</button>
      </Modal>
      <ErrorModal
        error={error?.message || logInError}
        parentName="SignUpCompany"
        actionAfterClosing={() => clearSignUpErrors(error, logInError)}
        customlMsg={logInErrorMessage}
      />
    </div>
  );
};

export default SignUpCompany;
