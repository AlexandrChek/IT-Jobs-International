import styles from '../../styles/components/buttons/CrossButton.module.css';

const CrossButton = ({ handlerArg, crossClickHandler, ...rest }) => {
  const handleClick = () => {
    handlerArg !== undefined ? crossClickHandler(handlerArg) : crossClickHandler();
  };

  return <div className={styles.crossBox} onClick={handleClick} {...rest}></div>;
};

export default CrossButton;
