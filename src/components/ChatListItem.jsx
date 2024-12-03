import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ChatListItem = ({ index, chat, userType, userId }) => {
  const userName = useSelector(state => state.auth.userName);

  const chatParticipantRoute =
    userType === 'seeker'
      ? `/company_profile/${chat.chatParticipantId}/public`
      : `/public_cv/${chat.chatParticipantId}`;
  const chatRoute =
    userType === 'seeker'
      ? `/job_seeker_profile/${userId}/chat/${chat.chatParticipantId}`
      : `/company_profile/${userId}/chat/${chat.chatParticipantId}`;

  return (
    <div key={index}>
      <Link to={chatParticipantRoute}>{chat.chatParticipantName}</Link>
      <Link
        to={chatRoute}
        state={{
          position: chat.position,
          chatParticipantId: chat.chatParticipantId,
        }}
      >
        <h5>{chat.position}</h5>
        <p>
          {chat.lastMessage.name === userName ? 'You' : `${chat.chatParticipantName}`}:
          {chat.lastMessage.text}
        </p>
      </Link>
    </div>
  );
};

export default ChatListItem;
