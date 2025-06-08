import { useState, useEffect } from 'react';

const MyCheckbox = ({ initialState = false, getVal, ...rest }) => {
  const [isChecked, setIsChecked] = useState(initialState || false);

  useEffect(() => setIsChecked(initialState || false), [initialState]);

  const handleChange = e => {
    setIsChecked(e.target.checked);
    if (getVal) {
      getVal(e.target.checked);
    }
  };

  return <input type="checkbox" {...rest} checked={isChecked} onChange={handleChange} />;
};

export default MyCheckbox;
