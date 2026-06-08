import { useSearchParams } from 'react-router-dom';
import { serverErrorMessage } from '../constants';
import styles from '../styles/pages/ServerError.module.css';

const ServerError = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const customMessageType = searchParams.get('custom_msg') || '';
  const customMessageEnd = 'or another error occurred.';
  const customMessages = {
    jobNotFound: `This job was not found ${customMessageEnd}`,
    profileNotFounde: `This profile was not found ${customMessageEnd}`,
  };
  const msg = customMessageType ? customMessages[customMessageType] : serverErrorMessage;

  return (
    <div className="routesWrapper">
      <div className={styles.msgBox}>
        <span>&#129402;</span>
        <h1>{msg}</h1>
      </div>
    </div>
  );
};

export default ServerError;
