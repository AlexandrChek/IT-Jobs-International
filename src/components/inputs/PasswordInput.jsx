import { forwardRef } from 'react';

const PasswordInput = forwardRef(({ val, setVal, ...rest }, ref) => {
  return (
    <input
      type="password"
      ref={ref}
      value={val}
      required
      {...rest}
      onChange={e => setVal(e.target.value)}
    />
  );
});

export default PasswordInput;
