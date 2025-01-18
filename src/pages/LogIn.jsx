import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logIn } from '../features/async/authSlice';
import { openModal } from '../features/sync/modalSlice';
import { createPostReqSettings } from '../methods';
import UserTypeToggler from '../components/UserTypeToggler';
import EmailInput from '../components/inputs/EmailInput';
import PasswordInput from '../components/inputs/PasswordInput';
import styles from '../styles/pages/LogIn.module.css';

const LogIn = () => {
  const dispatch = useDispatch();
  const { authFailureMessage } = useSelector(state => state.auth);
  const form = useRef();
  const regLink = <Link to="/sign_up">register</Link>;

  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData(form.current);
    const settings = createPostReqSettings('/login', formData);

    try {
      await dispatch(logIn(settings)).unwrap();

      if (authFailureMessage) {
        dispatch(openModal({ modalNameInSlice: 'modalInfo', message: authFailureMessage }));
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="routesWrapper">
      <h2>Log In</h2>
      <form ref={form} onSubmit={handleSubmit}>
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
    </div>
  );
};

export default LogIn;
