import MyCheckbox from '../inputs/MyCheckbox';
import styles from '../../styles/components/specific_inputs/CheckboxGroup.module.css';

const CheckboxGroup = ({
  groupName,
  legend,
  allValues = [],
  initialCheckedItems = [],
  isDirectionInline = false,
}) => {
  return (
    <fieldset className={styles.checkGroupField}>
      <legend>{legend}</legend>
      <div className={isDirectionInline ? styles.inline : styles.changeable}>
        {allValues.map(item => (
          <label key={item} className={styles.checkLabel}>
            <MyCheckbox
              name={groupName}
              value={item}
              initialState={initialCheckedItems.includes(item)}
            />
            {item}
          </label>
        ))}
      </div>
    </fieldset>
  );
};

export default CheckboxGroup;
