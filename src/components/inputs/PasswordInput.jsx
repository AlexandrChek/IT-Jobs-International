import { useState } from 'react';

const PasswordInput = ({ getVal, isError = false, ...rest }) => {
  const [val, setVal] = useState('');

  const handleBlur = e => {
    if (getVal) {
      getVal(e.target.value);
    }
  };

  return (
    <input
      type="password"
      minLength="3"
      value={val}
      className={isError ? 'inputError' : null}
      required
      {...rest}
      onChange={e => setVal(e.target.value)}
      onBlur={handleBlur}
    />
  );
};

export default PasswordInput;
