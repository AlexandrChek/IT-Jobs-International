import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPasswordsMatch } from '../features/sync/passwordsMatchSlice';
import { openModal } from '../features/sync/modalSlice';
import PasswordInput from './inputs/PasswordInput';

const RegFormPassword = () => {
  const dispatch = useDispatch();
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [isErrorInPas1, setIsErrorInPas1] = useState(false);
  const [isErrorInPas2, setIsErrorInPas2] = useState(false);

  useEffect(() => {
    dispatch(setPasswordsMatch(password1 === password2));
  }, [password1, password2]);

  const makeShortPasswordWarning = () => {
    const message = 'The password must contain at least three characters.';
    dispatch(openModal({ modalNameInSlice: 'modalInfo', message }));
    setIsErrorInPas1(true);
  };

  const checkPasswordLength = password => {
    setPassword1(password);

    if (password.length < 3) {
      makeShortPasswordWarning();
    } else if (password2) {
      checkPasswordsMatch(password, password2);
    } else {
      setIsErrorInPas1(false);
    }
  };

  const checkPasswordsMatch = (pass1, pass2) => {
    if (pass1 !== pass2) {
      const message = 'Passwords in both fields must match.';
      dispatch(openModal({ modalNameInSlice: 'modalInfo', message }));
      setIsErrorInPas1(true);
      setIsErrorInPas2(true);
    } else if (pass1.length < 3) {
      makeShortPasswordWarning();
    } else {
      setIsErrorInPas1(false);
      setIsErrorInPas2(false);
    }
  };

  const savePassword2 = password => {
    setPassword2(password);
    checkPasswordsMatch(password1, password);
  };

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
    </div>
  );
};

export default RegFormPassword;
