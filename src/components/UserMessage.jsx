import styles from '../styles/components/UserMessage.module.css';

const UserMessage = ({ msg, userName }) => {
  const msgArr = msg.text.split('\n');

  return (
    <div className={styles.messageWrapper}>
      <p>
        {msg.name === userName ? 'You' : msg.name}, {new Date(msg.date).toLocaleString()}
      </p>
      <div>
        {msgArr.map((item, index) => (
          <p key={index} className="largeText">
            {item}
          </p>
        ))}
      </div>
      {msg.cvFileLink && (
        <a href={msg.cvFileLink} target="_blank">
          Load CV
        </a>
      )}
    </div>
  );
};

export default UserMessage;
