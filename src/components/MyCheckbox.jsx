import { useState } from 'react';

const MyCheckbox = ({ initialState, getVal, ...rest }) => {
  const [isChecked, setIsChecked] = useState(initialState || false);

  const handleChange = e => {
    setIsChecked(!isChecked);
    if (getVal) {
      getVal(e.target.checked);
    }
  };

  return <input type="checkbox" {...rest} checked={isChecked} onChange={handleChange} />;
};

export default MyCheckbox;
