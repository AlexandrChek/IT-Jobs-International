import { Link } from 'react-router-dom';

const ChatAlreadyExistsMsg = ({ chatUrlEnd }) => {
  const existingChatLink = <Link to={`/chat${chatUrlEnd}`}>chat</Link>;

  return <p>You have already applied for this job. Do you want to open the {existingChatLink}?</p>;
};

export default ChatAlreadyExistsMsg;
