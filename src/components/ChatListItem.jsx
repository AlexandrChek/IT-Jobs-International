import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from '../styles/components/ChatListItem.module.css';

const ChatListItem = ({ chat, userType, userId }) => {
  const userName = useSelector(state => state.auth.userName);
  const chatRoute =
    userType === 'seeker'
      ? `/chat/${chat.chatParticipantId}/${userId}/${chat.job.jobId}`
      : `/chat/${userId}/${chat.chatParticipantId}/${chat.job.jobId}`;

  return (
    <Link to={chatRoute} className={styles.itemLink}>
      <h5>{chat.chatParticipantName}</h5>
      <h5>{chat.job.position}</h5>
      <p>
        {chat.lastMessage.name === userName ? 'You: ' : `${chat.chatParticipantName}: `}
        {chat.lastMessage.text}
      </p>
    </Link>
  );
};

export default ChatListItem;
