import styles from '../../styles/components/buttons/AddButton.module.css';

const AddButton = ({ itemName }) => {
  return (
    <div title={`Add ${itemName}`} className={styles.addButton}>
      +
    </div>
  );
};

export default AddButton;
