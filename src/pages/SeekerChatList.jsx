import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSeekerChats } from '../features/async/seekerChatSlice';
import { Link, useParams } from 'react-router-dom';
import styles from '../styles/pages/SeekerChatList.module.css';

const SeekerChatList = () => {
  const { seekerid } = useParams();
  const dispatch = useDispatch();
  const chats = []  //useSelector

  useEffect(() => {
    dispatch(fetchSeekerChats(seekerid));
  }, [dispatch, seekerid]);

  return (
    <div className={styles.chatList}>
      <h2>Correspondence</h2>
      {chats.length === 0 ? (
        <p>No correspondences yet.</p>
      ) : (
        chats.map((chat) => (
          <Link
            key={chat.id}
            to={`/job_seeker_profile/${seekerid}/chat/${chat.id}`}
            className={styles.chatItem}
          >
            {chat.companyName}
          </Link>
        ))
      )}
    </div>
  );
};

export default SeekerChatList;
