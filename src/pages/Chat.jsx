import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchChat, sendMessage, addMessageLocally, clearError } from '../features/async/chatSlice';
import { createPostReqSettings } from '../methods';
import Loading from '../components/Loading';
import UserMessage from '../components/UserMessage';
import MyTextarea from '../components/inputs/MyTextarea';
import ErrorModal from '../components/modals/ErrorModal';
import styles from '../styles/pages/Chat.module.css';

const Chat = () => {
  const dispatch = useDispatch();
  const { companyid, seekerid, jobid } = useParams() || {};
  const { userName } = useSelector(state => state.auth);
  const { chat, pending, error } = useSelector(state => state.currentChat);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    const url = `/chat/${companyid}/${seekerid}/${jobid}`;
    dispatch(fetchChat({ url }));
  }, [companyid, seekerid, jobid]);

  const send = async () => {
    if (messageText.trim()) {
      const message = {
        date: new Date().toLocaleString(),
        name: userName,
        text: messageText,
      };
      const sendingBody = {
        companyId: companyid,
        seekerId: seekerid,
        jobId: jobid,
        message,
      };
      const sendingSettings = createPostReqSettings('/add_chat_message', sendingBody);

      const sendingResult = await dispatch(sendMessage(sendingSettings));

      if (sendMessage.fulfilled.match(sendingResult)) {
        dispatch(addMessageLocally(message));
        setMessageText('');
      }
    }
  };

  return (
    <div className="routesWrapper">
      {pending && <Loading />}
      <Link to={`/${companyid}/job/${chat?.job.jobId}`}>
        <h2>{chat?.job.position}</h2>
      </Link>
      <div className={styles.messages}>
        {chat?.messages.map((msg, index) => (
          <UserMessage index={index} msg={msg} userName={userName} />
        ))}
      </div>
      <MyTextarea getVal={target => setMessageText(target.value)} placeholder="Type your message" />
      <button onClick={send}>Send</button>
      <ErrorModal
        error={['fetch', 'send'].includes(error?.actionCausedError) && error.message}
        parentName="Chat"
        actionAfterClosing={() => dispatch(clearError())}
      />
    </div>
  );
};

export default Chat;
