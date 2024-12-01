import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { fetchChat, sendMessage, addMessageLocally } from '../features/async/chatSlice';
import { createPostReqSettings } from '../methods';
import Loading from '../components/Loading';
import UserMessage from '../components/UserMessage';
import MyTextarea from '../components/inputs/MyTextarea';
import styles from '../styles/pages/Chat.module.css';

const Chat = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { userId, userName, userType } = useSelector(state => state.auth);
  const { chat, pending, error } = useSelector(state => state.currentChat);
  const [messageText, setMessageText] = useState('');
  let fetchingBody = {};

  useEffect(() => {
    fetchingBody = {
      userId,
      userType,
      chatParticipantId: state.chatParticipantId,
      position: state.position,
    };

    const fetchingSettings = createPostReqSettings('/chat', fetchingBody);

    dispatch(fetchChat(fetchingSettings));
  }, [dispatch, userId, state]);

  const send = async () => {
    if (messageText.trim()) {
      const message = {
        date: new Date().toLocaleString(),
        name: userName,
        text: messageText,
      };
      const sendingBody = { ...fetchingBody, message };
      const sendingSettings = createPostReqSettings('/add_chat_message', sendingBody);

      try {
        await dispatch(sendMessage(sendingSettings)).unwrap();
        dispatch(addMessageLocally(message));
        setMessageText('');
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="routesWrapper">
      {pending && <Loading />}
      {error && <h3>{error}</h3>}
      <Link to={chat.job.jobRoute}>
        <h2>{chat.job.position}</h2>
      </Link>
      <div className={styles.messages}>
        {chat.messages.map((msg, index) => (
          <UserMessage index={index} msg={msg} userName={userName} />
        ))}
      </div>
      <MyTextarea getVal={target => setMessageText(target.value)} placeholder="Type your message" />
      <button onClick={send}>Send</button>
    </div>
  );
};

export default Chat;
