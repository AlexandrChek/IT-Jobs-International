import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { fetchChat, sendMessage, addMessageLocally } from '../features/async/chatSlice';
import Loading from '../components/Loading';
import UserMessage from '../components/UserMessage';
import MyTextarea from '../components/MyTextarea';
import styles from '../styles/pages/Chat.module.css';

const Chat = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { userId, userName } = useSelector((state) => state.auth);
  const { chat, pending, error } = useSelector((state) => state.currentChat);
  const [messageText, setMessageText] = useState('');
  let fetchingSettings = {};
  let fetchingBody = {};

  useEffect(() => {
    fetchingBody = {
      userId,
      chatParticipantId: state.chatParticipantId,
      position: state.position,
    };

    fetchingSettings = {
      url: '/api/chat',
      options: {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fetchingBody),
      },
    };

    dispatch(fetchChat(fetchingSettings));
  }, [dispatch, userId, state]);

  const send = async () => {
    if (messageText.trim()) {
      const message = {
        date: new Date(),
        name: userName,
        text: messageText,
      };
      let sendingSettings = { ...fetchingSettings, url: '/api/addChatMessage' };
      let sendingBody = { ...fetchingBody, message };
      sendingSettings.options.body = JSON.stringify(sendingBody);

      try {
        await dispatch(sendMessage(sendingSettings)).unwrap();
        dispatch(addMessageLocally(message));
        setMessageText('');
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <>
      {pending && <Loading />}
      {error && <h3>{error}</h3>}
      <Link to={`/${chat.job.companyId}/job/${chat.job.jobId}`}>
        <h2>{state.position}</h2>
      </Link>
      <div className={styles.messages}>
        {chat.messages.map((msg, index) => (
          <UserMessage index={index} msg={msg} userName={userName} />
        ))}
      </div>
      <MyTextarea
        getVal={(target) => setMessageText(target.value)}
        placeholder="Type your message"
      />
      <button onClick={send}>Send</button>
    </>
  );
};

export default Chat;
