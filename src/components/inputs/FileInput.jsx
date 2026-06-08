import { useState, useEffect, useRef } from 'react';
import styles from '../../styles/components/inputs/FileInput.module.css';

const FileInput = ({ newWrapperClass = null, ...rest }) => {
  const initialValue = 'No file selected';
  const [fileNameValue, setFileNameValue] = useState(initialValue);
  const fileInputRef = useRef();
  const inputId = `fileInput-${Math.random()}`;

  useEffect(() => {
    const input = fileInputRef.current;

    if (!input) return;

    const handleChange = () => {
      const newValue = input.files.length ? input.files[0].name : initialValue;
      setFileNameValue(newValue);
    };

    input.addEventListener('change', handleChange);

    return () => input.removeEventListener('change', handleChange);
  }, []);

  return (
    <div className={`${styles.fileInputWrapper} ${newWrapperClass}`}>
      <input type="file" id={inputId} ref={fileInputRef} {...rest} />
      <label htmlFor={inputId} className="standardButton">
        Select file
      </label>
      <p title={fileNameValue}>{fileNameValue}</p>
    </div>
  );
};

export default FileInput;
