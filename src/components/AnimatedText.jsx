import styles from '../styles/components/AnimatedText.module.css';

const AnimatedText = ({ children }) => {
  return <p className={styles.animatedText}>{children}</p>;
};

export default AnimatedText;
