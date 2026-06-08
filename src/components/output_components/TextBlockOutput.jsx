import styles from '../../styles/components/output_components/TextBlockOutput.module.css';

const TextBlockOutput = ({ title, textContent, newClass = null }) => {
  return (
    <div className={`${styles.blockWrapper} ${newClass}`}>
      <h5>{title}</h5>
      <p className="largeText">{textContent}</p>
    </div>
  );
};

export default TextBlockOutput;
