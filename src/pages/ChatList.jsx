import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChatList } from '../features/async/chatListSlice';
import { getFetchingSettings } from '../methods';
import Loading from '../components/Loading';
import ChatListItem from '../components/ChatListItem';
import styles from '../styles/pages/ChatList.module.css';

const ChatList = () => {
  const dispatch = useDispatch();
  const { userId, userName, userType } = useSelector((state) => state.auth);
  const { chats, pending, error } = useSelector((state) => state.chatList);

  useEffect(() => {
    const settings = getFetchingSettings('/api/chat_list', userId, null, userName);
    dispatch(fetchChatList(settings));
  }, [dispatch, userId, userName]);

  return (
    <>
      <h2>Correspondence</h2>
      {pending && <Loading />}
      {error && <h3>{error}</h3>}
      {chats.length === 0 ? (
        <p>No correspondences yet.</p>
      ) : (
        chats.map((chat, index) => (
          <ChatListItem
            index={index}
            chat={chat}
            userType={userType}
            userId={userId}
            userName={userName}
          />
        ))
      )}
    </>
  );
};

export default ChatList;
