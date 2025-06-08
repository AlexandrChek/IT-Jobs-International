import { useState, useEffect } from 'react';

const MyInput = ({ initialValue = '', getVal, ...rest }) => {
  const [val, setVal] = useState(initialValue || '');

  useEffect(() => setVal(initialValue || ''), [initialValue]);

  const handleChange = e => {
    setVal(e.target.value);
    if (getVal) {
      getVal(e.target);
    }
  };

  return <input {...rest} value={val} onChange={handleChange} />;
};

export default MyInput;
