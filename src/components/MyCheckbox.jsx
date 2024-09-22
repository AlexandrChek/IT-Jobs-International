import { useState } from 'react';

const MyCheckbox = ({ initialState, ...rest }) => {
  const [isChecked, setIsChecked] = useState(initialState || false);

  return (
    <input
      type="checkbox"
      {...rest}
      checked={isChecked}
      onChange={(e) => setIsChecked(e.target.checked)}
    />
  );
};

export default MyCheckbox;
