import styles from '../styles/components/ProfileAndJobTitle.module.css';

const ProfileAndJobTitle = ({ children }) => {
  return <h2 className={styles.profAndJobTitle}>{children}</h2>;
};

export default ProfileAndJobTitle;
