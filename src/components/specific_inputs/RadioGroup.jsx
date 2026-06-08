import { useState, useEffect } from 'react';
import styles from '../../styles/components/specific_inputs/RadioGroup.module.css';

const RadioGroup = ({
  arrOfValueObj,
  groupName,
  legend,
  initialVal,
  isDirectionInline = false,
  isRequired = false,
  getVal,
}) => {
  const [val, setVal] = useState(initialVal || arrOfValueObj[0].value);

  useEffect(() => setVal(initialVal), [initialVal]);

  const toggle = currentValue => {
    setVal(currentValue);
    getVal && getVal(currentValue);
  };

  return (
    <fieldset className={styles.radioGroupField}>
      <legend>{legend}</legend>
      <div className={isDirectionInline ? styles.inline : styles.changeable}>
        {arrOfValueObj.map(item => (
          <label key={item.value}>
            <input
              type="radio"
              name={groupName}
              value={item.value}
              checked={val === item.value}
              onChange={e => toggle(e.target.value)}
              required={isRequired}
            />
            {item.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
};

export default RadioGroup;
