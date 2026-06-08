import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logIn, clearLogInError } from '../features/async/authSlice';
import { openModal, closeModal } from '../features/sync/modalSlice';
import { setSearchType } from '../features/sync/searchTypeSlice';
import { createPostReqSettings } from '../methods';
import { logInErrorMessage, userTypes } from '../constants';
import Loading from '../components/Loading';
import RadioGroup from '../components/specific_inputs/RadioGroup';
import EmailInput from '../components/specific_inputs/EmailInput';
import PasswordInput from '../components/specific_inputs/PasswordInput';
import SubmitButton from '../components/buttons/SubmitButton';
import Modal from '../components/modals/Modal';
import ErrorModal from '../components/modals/ErrorModal';
import { regLink } from '../constantLinks';
import styles from '../styles/pages/LogIn.module.css';

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pending, error, authFailureMessage } = useSelector(state => state.auth);
  const form = useRef();

  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData(form.current);
    const settings = createPostReqSettings('/login', formData);

    const logInResult = await dispatch(logIn(settings));

    if (logIn.fulfilled.match(logInResult)) {
      if (logInResult.payload.authFailureMessage) {
        dispatch(openModal('LogIn'));
      } else {
        const searchType = logInResult.payload.userType === 'company' ? 'cv' : 'job';
        dispatch(setSearchType(searchType));
        navigate('/');
      }
    }
  };

  return (
    <div className="routesWrapper">
      {pending && <Loading />}
      <h2 className={styles.logInTitle}>Log In</h2>
      <form ref={form} onSubmit={handleSubmit} className={`flexColumnBox ${styles.logInForm}`}>
        <RadioGroup
          arrOfValueObj={userTypes}
          groupName="userType"
          legend="User Type*"
          isDirectionInline={true}
          isRequired={true}
        />
        <EmailInput isRequired={true} />
        <PasswordInput name="password" />
        <SubmitButton>Log In</SubmitButton>
      </form>
      <p>If you don't have an account yet, please {regLink}.</p>
      <Modal modalNameProp="LogIn" message={authFailureMessage}>
        <button className="standardButton" onClick={() => dispatch(closeModal())}>
          Close
        </button>
      </Modal>
      <ErrorModal
        error={error}
        parentName="LogIn"
        actionAfterClosing={() => dispatch(clearLogInError())}
        customMsg={logInErrorMessage}
      />
    </div>
  );
};

export default LogIn;
