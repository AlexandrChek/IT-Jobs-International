import { uploadedFileRestrictions } from '../../constants';
import FileInput from '../inputs/FileInput';
import styles from '../../styles/components/specific_inputs/CvFileInput.module.css';

const CvFileInput = () => {
  return (
    <fieldset>
      <legend>Upload your CV file</legend>
      <FileInput name="cvFile" newWrapperClass={styles.cvInput} />
      {uploadedFileRestrictions.map((item, index) => (
        <p key={index} className={styles.restrictions}>
          {item}
        </p>
      ))}
    </fieldset>
  );
};

export default CvFileInput;
