import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSeekerChat, sendMessage } from '../features/async/seekerChatSlice';
import { useParams } from 'react-router-dom';
import styles from '../styles/pages/SeekerChat.module.css';

const SeekerChat = () => {
  const { seekerid, corresp_id } = useParams();
  const dispatch = useDispatch();
  const chat = [] //useSelector
  const [message, setMessage] = useState('');

  useEffect(() => {
    dispatch(fetchSeekerChat({ seekerid, corresp_id }));
  }, [dispatch, seekerid, corresp_id]);

  const handleSend = () => {
    if (message.trim()) {
      dispatch(sendMessage({ seekerid, corresp_id, message }));
      setMessage('');
    }
  };

  if (!chat) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.chat}>
      <h2>Conversation with {chat.companyName}</h2>
      <div className={styles.messages}>
        {chat.messages.map((msg, index) => (
          <p key={index} className={msg.fromSeeker ? styles.fromSeeker : styles.fromCompany}>
            {msg.text}
          </p>
        ))}
      </div>
      <div className={styles.input}>
        <input 
          type="text" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default SeekerChat;
