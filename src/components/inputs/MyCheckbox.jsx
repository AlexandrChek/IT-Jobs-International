import { useState, useEffect } from 'react';

const MyCheckbox = ({ initialState = false, getVal, ...rest }) => {
  const [isChecked, setIsChecked] = useState(initialState || false);

  useEffect(() => setIsChecked(initialState || false), [initialState]);

  const handleChange = currentValue => {
    setIsChecked(currentValue);
    getVal?.(currentValue);
  };

  return (
    <input
      type="checkbox"
      checked={isChecked}
      onChange={e => handleChange(e.target.checked)}
      {...rest}
    />
  );
};

export default MyCheckbox;
