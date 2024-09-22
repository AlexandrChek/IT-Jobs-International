import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCompanyChat, sendCompanyMessage } from '../features/async/companyChatSlice';
import styles from '../styles/pages/CompanyChat.module.css';

const CompanyChat = () => {
  const { companyid, corresp_id } = useParams();
  const dispatch = useDispatch();
  const chat = []; //useSelector
  const [message, setMessage] = useState('');

  useEffect(() => {
    dispatch(fetchCompanyChat({ companyid, corresp_id }));
  }, [dispatch, companyid, corresp_id]);

  const handleSend = () => {
    if (message.trim()) {
      dispatch(sendCompanyMessage({ companyid, corresp_id, message }));
      setMessage('');
    }
  };

  if (!chat) {
    return <p>Loading...</p>;
  }

  return (
    <div className="routesWrapper">
      <h2>Conversation with {chat.seekerName}</h2>
      <div className={styles.messages}>
        {chat.messages.map((msg, index) => (
          <p key={index} className={msg.fromCompany ? styles.fromCompany : styles.fromSeeker}>
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

export default CompanyChat;
