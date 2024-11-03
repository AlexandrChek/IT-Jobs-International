import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logIn } from '../features/async/authSlice';
import { getRequestSettings } from '../methods';
import UserTypeToggler from '../components/UserTypeToggler';
import EmailInput from '../components/inputs/EmailInput';
import MyInput from '../components/inputs/MyInput';
import Modal from '../components/Modal';
import styles from '../styles/pages/LogIn.module.css';

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authFailureMessage } = useSelector(state => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authError, setAuthError] = useState(null);
  const form = useRef();
  const regLink = <Link to="/sign_up">register</Link>;

  const handleSubmit = async e => {
    e.preventDefault();

    const formData = new FormData(form.current);
    const settings = getRequestSettings('/api/login', formData);

    try {
      await dispatch(logIn(settings)).unwrap();

      if (authFailureMessage) {
        setIsModalOpen(true);
      } else {
        navigate('/');
      }
    } catch (error) {
      setAuthError(error.message);
    }
  };

  const close = () => setIsModalOpen(false);

  return (
    <div className="routesWrapper">
      <h2>Log In</h2>
      {authError && <h3>{authError}</h3>}
      <form ref={form} onSubmit={handleSubmit}>
        <UserTypeToggler />
        <EmailInput />
        <div>
          <label htmlFor="password">Password</label>
          <MyInput type="password" id="password" name="password" required />
        </div>
        <button type="submit">Log In</button>
      </form>
      <p>If you don't have an account yet, please {regLink}.</p>

      <Modal isOpen={isModalOpen} close={close}>
        <p>{authFailureMessage}</p>
        <button onClick={close}>Ok</button>
      </Modal>
    </div>
  );
};

export default LogIn;
