import { useState, useEffect } from 'react';
import styles from '../../styles/components/inputs/MySelect.module.css';

const MySelect = ({
  selectId = null,
  options,
  initialValue = '',
  emptyOption = '',
  getVal,
  isRequired = false,
  ...rest
}) => {
  const [selected, setSelected] = useState(initialValue ?? '');

  useEffect(() => setSelected(initialValue ?? ''), [initialValue]);

  const handleChange = e => {
    setSelected(e.target.value);

    getVal?.({
      id: e.target.options[e.target.selectedIndex].id ?? '',
      value: e.target.value,
    });
  };

  return (
    <select
      id={selectId}
      value={selected}
      onChange={handleChange}
      className={styles.mySelect}
      required={isRequired}
      {...rest}
    >
      {emptyOption && (
        <option value="" className={styles.unusedOption}>
          {emptyOption}
        </option>
      )}
      {options?.map((option, index) => (
        <option
          key={option.id ?? index}
          id={option.id ?? index}
          value={option.value ?? option}
          disabled={option.disabled ?? false}
          className={option.disabled ? styles.unusedOption : ''}
        >
          {option.value ?? option} {option.causeOfDisabling && `(${option.causeOfDisabling})`}
        </option>
      ))}
    </select>
  );
};

export default MySelect;
