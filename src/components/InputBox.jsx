import styles from '../styles/components/InputBox.module.css';

const InputBox = ({ children, id, startLabel, endLabel = null, ...rest }) => {
  return (
    <div className={styles.inputBox} {...rest}>
      <div className={styles.relativeBox} style={{ '--start-label': `"${startLabel}"` }}>
        {children}
        <label htmlFor={id} className={styles.startLabel}>
          {startLabel}
        </label>
        {endLabel && <label htmlFor={id}>{endLabel}</label>}
      </div>
    </div>
  );
};

export default InputBox;
