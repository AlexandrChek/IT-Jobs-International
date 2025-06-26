import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logIn, clearLogInError } from '../features/async/authSlice';
import { openModal, closeModal } from '../features/sync/modalSlice';
import { createPostReqSettings } from '../methods';
import { logInErrorMessage } from '../constants';
import Loading from '../components/Loading';
import UserTypeToggler from '../components/UserTypeToggler';
import EmailInput from '../components/inputs/EmailInput';
import PasswordInput from '../components/inputs/PasswordInput';
import Modal from '../components/modals/Modal';
import ErrorModal from '../components/modals/ErrorModal';
import styles from '../styles/pages/LogIn.module.css';

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pending, error, authFailureMessage } = useSelector(state => state.auth);
  const form = useRef();
  const authFailureMessageRef = useRef(authFailureMessage);
  const regLink = <Link to="/sign_up">register</Link>;

  useEffect(() => {
    authFailureMessageRef.current = authFailureMessage;
  }, [authFailureMessage]);

  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData(form.current);
    const settings = createPostReqSettings('/login', formData);

    const logInResult = await dispatch(logIn(settings));

    if (logIn.fulfilled.match(logInResult)) {
      if (authFailureMessageRef.current) {
        dispatch(openModal('LogIn'));
      } else {
        navigate('/');
      }
    }
  };

  return (
    <div className="routesWrapper">
      <h2>Log In</h2>
      <form ref={form} onSubmit={handleSubmit}>
        {pending && <Loading />}
        <UserTypeToggler />
        <EmailInput />
        <div>
          <label>
            Password
            <PasswordInput name="password" />
          </label>
        </div>
        <button type="submit">Log In</button>
      </form>
      <p>If you don't have an account yet, please {regLink}.</p>
      <Modal modalNameProp="LogIn" message={authFailureMessage}>
        <button onClick={() => dispatch(closeModal())}>Close</button>
      </Modal>
      <ErrorModal
        error={error}
        parentName="LogIn"
        actionAfterClosing={() => dispatch(clearLogInError())}
        customlMsg={logInErrorMessage}
      />
    </div>
  );
};

export default LogIn;
