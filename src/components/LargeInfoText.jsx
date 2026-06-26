import styles from '../styles/components/LargeInfoText.module.css';

const LargeInfoText = ({ arrayOfStrings }) => {
  return (
    <>
      {arrayOfStrings.map((item, index) => (
        <p key={index} className={`largeText ${styles.paragraph}`}>
          {item}
        </p>
      ))}
    </>
  );
};

export default LargeInfoText;
