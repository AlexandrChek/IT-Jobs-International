import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { openModal, closeModal } from '../features/sync/modalSlice';
import { setPasswordsMatch } from '../features/sync/passwordsMatchSlice';
import PasswordInput from './inputs/PasswordInput';
import Modal from './modals/Modal';

const RegFormPassword = () => {
  const dispatch = useDispatch();
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [isErrorInPas1, setIsErrorInPas1] = useState(false);
  const [isErrorInPas2, setIsErrorInPas2] = useState(false);
  const shortPasswordWarning = 'The password must contain at least three characters.';
  const passwordsMismatchWarning = 'Passwords in both fields must match.';
  const [message, setMessage] = useState('');

  useEffect(() => {
    dispatch(setPasswordsMatch(password1 === password2));
  }, [password1, password2]);

  const showShortPasswordWarning = () => {
    setMessage(shortPasswordWarning);
    dispatch(openModal('RegFormPassword'));
    setIsErrorInPas1(true);
  };

  const checkPasswordLength = password => {
    setPassword1(password);

    if (password.length < 3) {
      showShortPasswordWarning();
    } else if (password2) {
      checkPasswordsMatch(password, password2);
    } else {
      setIsErrorInPas1(false);
    }
  };

  const checkPasswordsMatch = (pass1, pass2) => {
    if (pass1 !== pass2) {
      setMessage(passwordsMismatchWarning);
      dispatch(openModal('RegFormPassword'));
      setIsErrorInPas1(true);
      setIsErrorInPas2(true);
    } else if (pass1.length < 3) {
      showShortPasswordWarning();
    } else {
      setIsErrorInPas1(false);
      setIsErrorInPas2(false);
    }
  };

  const savePassword2 = password => {
    setPassword2(password);
    checkPasswordsMatch(password1, password);
  };

  const closeModalWindow = () => {
    dispatch(closeModal());
    setMessage('');
  };

  const actionAfterClickOnBackdrop = () => setMessage('');

  return (
    <div>
      <label>
        Password
        <PasswordInput name="password" getVal={checkPasswordLength} isError={isErrorInPas1} />
      </label>
      <label>
        Password (again)
        <PasswordInput getVal={savePassword2} isError={isErrorInPas2} />
      </label>
      <Modal
        modalNameProp="RegFormPassword"
        message={message}
        actionAfterClickOnBackdrop={actionAfterClickOnBackdrop}
      >
        <button onClick={closeModalWindow}>Close</button>
      </Modal>
    </div>
  );
};

export default RegFormPassword;
