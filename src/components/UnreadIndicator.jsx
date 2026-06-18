import styles from '../styles/components/UnreadIndicator.module.css';

const UnreadIndicator = ({ unreadCount, children }) => {
  return (
    <span className={styles.unreadWrapper}>
      <span className={`${styles.unreadCount} ${!unreadCount ? styles.zeroValue : ''}`}>
        {unreadCount}
      </span>
      {children}
    </span>
  );
};

export default UnreadIndicator;
