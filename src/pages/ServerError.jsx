import { serverErrorMessage } from '../constants';
import styles from '../styles/pages/ServerError.module.css';

const ServerError = () => {
  return (
    <div className="routesWrapper">
      <h1 className={styles.errorMessage}>{serverErrorMessage}</h1>
    </div>
  );
};

export default ServerError;
