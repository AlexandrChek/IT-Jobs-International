import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompanyChats } from '../features/async/companyChatSlice';
import { Link, useParams } from 'react-router-dom';
import styles from '../styles/pages/CompanyChatList.module.css';

const CompanyChatList = () => {
  const { companyid } = useParams();
  const dispatch = useDispatch();
  const chats = []; //useSelector

  useEffect(() => {
    dispatch(fetchCompanyChats(companyid));
  }, [dispatch, companyid]);

  return (
    <div className="routesWrapper">
      <h2>Correspondence</h2>
      {chats.length === 0 ? (
        <p>No correspondences yet.</p>
      ) : (
        chats.map((chat) => (
          <Link
            key={chat.corresp_id}
            to={`/company_profile/${companyid}/chat/${chat.corresp_id}`}
            className={styles.chatLink}
          >
            Conversation with {chat.seekerName}
          </Link>
        ))
      )}
    </div>
  );
};

export default CompanyChatList;
