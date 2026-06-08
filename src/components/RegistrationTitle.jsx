import styles from '../styles/components/RegistrationTitle.module.css';

const RegistrationTitle = () => {
  return (
    <>
      <h2 className={styles.mainTitle}>Registration data</h2>
      <p>All fields are required</p>
    </>
  );
};

export default RegistrationTitle;
