import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logIn } from '../features/async/authSlice';
import { userTypes} from '../constants';
import EmailInput from '../components/EmailInput';
import MyInput from '../components/MyInput';
import Modal from '../components/Modal';
import styles from '../styles/pages/LogIn.module.css';

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authFailureMessage } = useSelector(state => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authError, setAuthError] = useState(null);
  const form = useRef();
  const regLink = (<Link to="/sign_up">register</Link>);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let formData = new FormData(form.current);
    formData.append('action', 'logIn');
    const options = {
      method: 'POST',
      body: formData
    };

    try {
      await dispatch(logIn(options)).unwrap();

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
    <div className={styles.login}>
      <h2>Log In</h2>
      {authError && <h3>{authError}</h3>}
      <form ref={form} onSubmit={handleSubmit}>
        <fieldset>
          <legend>Who are uoy?</legend>
          {userTypes.map(item => (
            <label key={item}>
              <input
                type="radio"
                name="userType"
                value={item}
                required
              /> {item}
            </label>
          ))}
        </fieldset>

        <EmailInput />

        <div>
          <label htmlFor="password">Password</label>
          <MyInput
            type="password"
            id="password"
            name="password"
            required
          />
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
