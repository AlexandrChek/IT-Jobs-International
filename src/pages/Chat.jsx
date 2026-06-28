import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  fetchChat,
  sendMessage,
  setToZeroChatUnreadCount,
  addMessageLocally,
  clearError,
} from '../features/async/chatSlice';
import { markMessagesAsRead } from '../features/async/authSlice';
import { createPostReqSettings } from '../methods';
import Loading from '../components/Loading';
import UserProfilePublicLink from '../components/UserProfilePublicLink';
import UserMessage from '../components/UserMessage';
import MyTextarea from '../components/inputs/MyTextarea';
import DownButton from '../components/buttons/DownButton';
import ErrorModal from '../components/modals/ErrorModal';
import styles from '../styles/pages/Chat.module.css';

const Chat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { companyid, seekerid, jobid } = useParams() || {};
  const { userName, userType } = useSelector(state => state.auth);
  const { chat, pending, error } = useSelector(state => state.currentChat);
  const messageFieldRef = useRef();
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    if (userType) {
      const url = `/chat/${userType}/${companyid}/${seekerid}/${jobid}`;
      dispatch(fetchChat({ url }));
    } else {
      navigate('/');
    }
  }, [userType, companyid, seekerid, jobid]);

  useEffect(() => {
    if (chat?.messages.length === chat?.msgCount && chat?.unreadCount) {
      const url = `/mark_messages_as_read/${userType}/${seekerid}/${companyid}/${jobid}`;
      dispatch(markMessagesAsRead({ url }));
      dispatch(setToZeroChatUnreadCount());
    }
  }, [chat?.messages.length, chat?.msgCount, chat?.unreadCount]);

  const scrollToMessageField = () => messageFieldRef.current.scrollIntoView();

  const send = async () => {
    if (messageText.trim()) {
      const message = {
        date: Date.now(),
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
      <Link to={`/${companyid}/job/${jobid}`}>
        <h2 className={styles.position}>{chat?.job?.position}</h2>
      </Link>
      <UserProfilePublicLink
        userName={chat?.chatParticipantName}
        userId={userType === 'seeker' ? companyid : seekerid}
        userType={userType === 'seeker' ? 'company' : 'seeker'}
        className={styles.userName}
      />
      <div className={`flexColumnBox ${styles.messages}`}>
        {chat?.messages.map((msg, index) => (
          <UserMessage key={index} msg={msg} userName={userName} className={styles.msg} />
        ))}
      </div>
      <MyTextarea
        getTargetOnChange={target => setMessageText(target.value)}
        initialValue={messageText}
        placeholder="Type your message"
        ref={messageFieldRef}
        className={styles.messageField}
      />
      <button className="standardButton" onClick={send}>
        Send
      </button>
      <DownButton
        isDataLoaded={chat?.messages?.length === chat?.msgCount}
        targetRef={messageFieldRef}
        goDown={scrollToMessageField}
      />
      <ErrorModal
        error={['fetch', 'send'].includes(error?.actionCausedError) && error.message}
        parentName="Chat"
        actionAfterClosing={() => dispatch(clearError())}
      />
    </div>
  );
};

export default Chat;
