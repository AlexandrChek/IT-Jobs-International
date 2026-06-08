import styles from '../styles/components/Loading.module.css';

const Loading = () => {
  return (
    <div className={styles.spinnerWrapper}>
      {Array.from({ length: 11 }, (_, i) => i + 1).map(num => (
        <div key={num} className={styles.circleWrapper} style={{ '--num': num }}>
          <div className={styles.circle} style={{ '--num': num }}></div>
        </div>
      ))}
    </div>
  );
};

export default Loading;
