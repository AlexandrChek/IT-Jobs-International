import { useState, useEffect } from 'react';

const useControlledInputScript = (initialValue = '', getTargetOnChange) => {
  const [value, setValue] = useState(initialValue ?? '');

  useEffect(() => setValue(initialValue ?? ''), [initialValue]);

  const handleChange = target => {
    setValue(target.value);
    getTargetOnChange?.(target);
  };

  return { value, handleChange };
};

export default useControlledInputScript;
