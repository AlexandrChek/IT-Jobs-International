import styles from '../../styles/components/buttons/AddButton.module.css';

const AddButton = ({ addItem, itemName }) => {
  return <button onClick={addItem} title={`Add ${itemName}`} className={styles.addButton} />;
};

export default AddButton;
