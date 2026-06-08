import MyCheckbox from '../inputs/MyCheckbox';
import styles from '../../styles/components/specific_inputs/AdjoinedCheckbox.module.css';

const AdjoinedCheckbox = ({ children, label, initialState = false, ...rest }) => {
  return (
    <div>
      {children}
      <label className={styles.checkboxLabel}>
        <MyCheckbox initialState={initialState} {...rest} />
        {label}
      </label>
    </div>
  );
};

export default AdjoinedCheckbox;
