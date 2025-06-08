import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ChatListItem = ({ index, chat, userType, userId }) => {
  const userName = useSelector(state => state.auth.userName);

  const chatParticipantRoute =
    userType === 'seeker'
      ? `/company_profile/${chat.chatParticipantId}/public`
      : `/cv/${chat.chatParticipantId}/public`;
  const chatRoute =
    userType === 'seeker'
      ? `/chat/${chat.chatParticipantId}/${userId}/${chat.job.jobId}`
      : `/chat/${userId}/${chat.chatParticipantId}/${chat.job.jobId}`;

  return (
    <div key={index}>
      <Link to={chatParticipantRoute}>{chat.chatParticipantName}</Link>
      <Link to={chatRoute}>
        <h5>{chat.job.position}</h5>
        <p>
          {chat.lastMessage.name === userName ? 'You' : `${chat.chatParticipantName}`}:
          {chat.lastMessage.text}
        </p>
      </Link>
    </div>
  );
};

export default ChatListItem;
