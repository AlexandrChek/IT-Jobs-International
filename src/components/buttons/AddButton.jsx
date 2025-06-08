import styles from '../../styles/components/buttons/AddButton.module.css';

const AddButton = ({ itemName, ...rest }) => {
  return (
    <div title={`Add ${itemName}`} className={styles.addButton} {...rest}>
      +
    </div>
  );
};

export default AddButton;
