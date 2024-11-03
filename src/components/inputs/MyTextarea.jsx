import { useState } from 'react';

const MyTextarea = ({ initialValue, getVal, ...rest }) => {
  const [val, setVal] = useState(initialValue || '');

  const handleChange = e => {
    setVal(e.target.value);
    if (getVal) {
      getVal(e.target);
    }
  };

  return <textarea {...rest} value={val} onChange={handleChange} />;
};

export default MyTextarea;
