import styles from '../../styles/components/buttons/BurgerButton.module.css';

const BurgerButton = props => {
  return (
    <div className={styles.burgerBox} {...props}>
      <div></div>
    </div>
  );
};

export default BurgerButton;
