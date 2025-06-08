import { useState, useEffect } from 'react';

const useFormValidation = (isServerDataLoaded = false) => {
  const [isValid, setIsValid] = useState(isServerDataLoaded);

  useEffect(() => {
    if (isServerDataLoaded) {
      setIsValid(true);
    }
  }, [isServerDataLoaded]);

  const checkFormValidity = formElem => {
    const checkRes = formElem.checkValidity();

    if (isValid !== checkRes) {
      setIsValid(checkRes);
    }
  };

  return { isValid, checkFormValidity };
};

export default useFormValidation;
