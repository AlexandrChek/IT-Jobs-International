import { useState } from 'react';

const PasswordInput = ({ getVal, isError = false, ...rest }) => {
  const [val, setVal] = useState('');

  return (
    <input
      type="password"
      minLength="3"
      value={val}
      className={isError ? 'inputError' : null}
      required
      {...rest}
      onChange={e => setVal(e.target.value)}
      onBlur={e => getVal(e.target.value)}
    />
  );
};

export default PasswordInput;
