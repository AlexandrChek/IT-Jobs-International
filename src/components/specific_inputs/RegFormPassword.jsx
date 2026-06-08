import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { openModal, closeModal } from '../../features/sync/modalSlice';
import { setPasswordsMatch } from '../../features/sync/passwordsMatchSlice';
import PasswordInput from './PasswordInput';
import Modal from '../modals/Modal';

const RegFormPassword = () => {
  const dispatch = useDispatch();
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [isErrorInPas1, setIsErrorInPas1] = useState(false);
  const [isErrorInPas2, setIsErrorInPas2] = useState(false);
  const [message, setMessage] = useState('');
  const isFirstInputPas1Ref = useRef(true);
  const isFirstInputPas2Ref = useRef(true);
  const isShortPas1Ref = useRef(password1.length < 3);
  const doPasswordsMatchRef = useRef(password1 === password2);
  const shortPasswordWarning = 'The password must contain at least three characters.';
  const passwordsMismatchWarning = 'Passwords in both fields must match.';

  useEffect(() => {
    isShortPas1Ref.current = password1.length < 3;
    doPasswordsMatchRef.current = password1 === password2;

    dispatch(setPasswordsMatch(doPasswordsMatchRef.current));

    setIsErrorInPas1(!isFirstInputPas1Ref.current && isShortPas1Ref.current);

    if (!isFirstInputPas2Ref.current && !doPasswordsMatchRef.current) {
      setIsErrorInPas1(true);
      setIsErrorInPas2(true);
    } else {
      setIsErrorInPas2(false);
      !isShortPas1Ref.current && setIsErrorInPas1(false);
    }
  }, [password1, password2, isFirstInputPas1Ref.current, isFirstInputPas2Ref.current]);

  const showShortPasswordWarning = () => {
    setMessage(shortPasswordWarning);
    dispatch(openModal('RegFormPassword'));
  };

  const checkPasswordLength = () => {
    isFirstInputPas1Ref.current = false;

    if (isShortPas1Ref.current) {
      showShortPasswordWarning();
    } else if (password2) {
      checkPasswordsMatch();
    }
  };

  const checkPasswordsMatch = () => {
    isFirstInputPas2Ref.current = false;

    if (!doPasswordsMatchRef.current) {
      setMessage(passwordsMismatchWarning);
      dispatch(openModal('RegFormPassword'));
    } else if (isShortPas1Ref.current) {
      showShortPasswordWarning();
    }
  };

  const closeModalWindow = () => {
    dispatch(closeModal());
    setMessage('');
  };

  const actionAfterClickOnBackdrop = () => setMessage('');

  return (
    <>
      <PasswordInput
        name="password"
        id="password1"
        getVal={val => setPassword1(val)}
        onBlur={checkPasswordLength}
        isError={isErrorInPas1}
      />
      <PasswordInput
        id="password2"
        label="Password (again)*"
        getVal={val => setPassword2(val)}
        onBlur={checkPasswordsMatch}
        isError={isErrorInPas2}
      />
      <Modal
        modalNameProp="RegFormPassword"
        message={message}
        actionAfterClickOnBackdrop={actionAfterClickOnBackdrop}
      >
        <button className="standardButton" onClick={closeModalWindow}>
          Close
        </button>
      </Modal>
    </>
  );
};

export default RegFormPassword;
