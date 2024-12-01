import { useState, useRef } from 'react';
import PasswordInput from './inputs/PasswordInput';
import Modal from './Modal';
import { shortPassWarning, passwordsDontMatchWarning } from '../constants';

const RegFormPassword = () => {
  const [warning, setWarning] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const pas1Ref = useRef();
  const pas2Ref = useRef();

  const checkPasswordLength = pas1 => {
    setPassword1(pas1);

    if (pas1.length < 3) {
      setWarning(shortPassWarning);
      setIsModalOpen(true);
    }
  };

  const checkPasswordMatch = pas2 => {
    if (password1 === pas2) {
      setPassword2(pas2);
    } else {
      setWarning(passwordsDontMatchWarning);
      setIsModalOpen(true);
    }
  };

  const close = () => {
    setIsModalOpen(false);

    if (warning === shortPassWarning) {
      setPassword1('');
      pas1Ref.current.focus();
    } else {
      setPassword2('');
      pas2Ref.current.focus();
    }

    setWarning('');
  };

  return (
    <div>
      <label>
        Password
        <PasswordInput name="password" ref={pas1Ref} val={password1} setVal={checkPasswordLength} />
      </label>
      <label>
        Password (again)
        <PasswordInput ref={pas2Ref} val={password2} setVal={checkPasswordMatch} />
      </label>

      <Modal isOpen={isModalOpen} close={close}>
        <p>{warning}</p>
        <button onClick={close}>Ok</button>
      </Modal>
    </div>
  );
};

export default RegFormPassword;
