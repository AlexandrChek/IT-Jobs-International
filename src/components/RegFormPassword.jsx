import { useState, useRef } from 'react';
import MyInput from './MyInput';
import Modal from './Modal';
import { shortPassWarning, passwordsDontMatchWarning } from '../constants';

const RegFormPassword = () => {
  const [warning, setWarning] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const firstPassword = useRef();
  const secondPassword = useRef();
  let password1 = '';
  let password2 = '';

  const checkPasswordLength = () => {
    if (password1.length < 3) {
      setWarning(shortPassWarning);
      setIsModalOpen(true);
    }
  };

  const checkPasswordMatch = () => {
    if (password1 !== password2) {
      setWarning(passwordsDontMatchWarning);
      setIsModalOpen(true);
    }
  };

  const close = () => {
    setIsModalOpen(false);
    if (warning === shortPassWarning) {
      firstPassword.current.focus();
    } else {
      secondPassword.current.focus();
    }
  };

  return (
    <div>
      <label>
        Password
        <MyInput
          type="password"
          name="password"
          ref={firstPassword}
          required
          getVal={(target) => (password1 = target.value)}
          onBlur={checkPasswordLength}
        />
      </label>
      <label>
        Password (again)
        <MyInput
          type="password"
          ref={secondPassword}
          required
          getVal={(target) => (password2 = target.value)}
          onBlur={checkPasswordMatch}
        />
      </label>
      <Modal isOpen={isModalOpen} close={close}>
        <p>{warning}</p>
        <button onClick={close}>Ok</button>
      </Modal>
    </div>
  );
};

export default RegFormPassword;
