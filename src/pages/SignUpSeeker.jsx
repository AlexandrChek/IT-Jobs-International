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
import FullNameInputs from '../components/specific_inputs/FullNameInputs';
import DateOfBirthInput from '../components/specific_inputs/DateOfBirthInput';
import CountryCityInputs from '../components/specific_inputs/CountryCityInputs';
import CommonElemsInRegForms from '../components/CommonElemsInRegForms';
import Modal from '../components/modals/Modal';
import ErrorModal from '../components/modals/ErrorModal';

const SignUpSeeker = () => {
  const dispatch = useDispatch();
  const clearSignUpErrors = useClearSignUpErrors();
  const { regData, pending, error, emailDoesAlreadyExist } = useSelector(
    state => state.userRegData,
  );
  const logInError = useSelector(state => state.auth.error);
  const { doPasswordsMatch } = useSelector(state => state.passwordsMatch);
  const form = useRef();
  const { seekerid } = useParams() || {};
  const { saveData, savingMessage } = useSaveRegData();
  const message = emailDoesAlreadyExist || savingMessage;

  useFetchRegData(seekerid, 'seeker');

  useShowEmailExistModal(emailDoesAlreadyExist, 'SignUpSeeker');

  const handleSubmit = e => {
    e.preventDefault();

    if (doPasswordsMatch) {
      const formData = new FormData(form.current);
      const url = seekerid ? `/edit/seeker_reg_data/${seekerid}` : '/sign_up/seeker';

      saveData({ url, formData, userType: 'seeker' });
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
      {pending && <Loading />}
      <RegistrationTitle />
      <form ref={form} onSubmit={handleSubmit} className="flexColumnBox">
        <FullNameInputs initialFirstName={regData?.firstName} initialLastName={regData?.lastName} />
        <DateOfBirthInput initialValue={regData?.dateOfBirth} />
        <CountryCityInputs
          initialCountry={regData?.country}
          initialCity={regData?.city}
          areRequired={true}
        />
        <CommonElemsInRegForms
          initialPhone={regData?.phone}
          initialEmail={regData?.email}
          userId={seekerid}
        />
      </form>
      <Modal
        modalNameProp="SignUpSeeker"
        message={message}
        actionAfterClickOnBackdrop={runClearEmailExist}
      >
        <button className="standardButton" onClick={closeInfoModal}>
          Close
        </button>
      </Modal>
      <ErrorModal
        error={error?.message || logInError}
        parentName="SignUpSeeker"
        actionAfterClosing={() => clearSignUpErrors(error, logInError)}
        customMsg={logInErrorMessage}
      />
    </div>
  );
};

export default SignUpSeeker;
