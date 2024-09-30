import { Link } from 'react-router-dom';

const ChatListItem = ({ index, chat, userType, userId, userName }) => {
  return (
    <div key={index}>
      {userType === 'Job seeker' ? (
        <Link to={`/company_profile/${chat.chatParticipantId}/public`}>
          {chat.chatParticipantName}
        </Link>
      ) : (
        <h5>{chat.chatParticipantName}</h5>
      )}
      <Link
        to={
          userType === 'Job seeker'
            ? `/job_seeker_profile/${userId}/chat/${chat.chatParticipantId}`
            : `/company_profile/${userId}/chat/${chat.chatParticipantId}`
        }
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
