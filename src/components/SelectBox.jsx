import styles from '../styles/components/SelectBox.module.css';

const SelectBox = ({ selectId, label, children }) => {
  return (
    <div className={styles.selectWrapper}>
      <label htmlFor={selectId}>{label}</label>
      {children}
    </div>
  );
};

export default SelectBox;
