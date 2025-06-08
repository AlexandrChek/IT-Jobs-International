import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChatList } from '../features/async/chatListSlice';
import useShowErrorPage from '../hooks/useShowErrorPage';
import Loading from '../components/Loading';
import ChatListItem from '../components/ChatListItem';
import styles from '../styles/pages/ChatList.module.css';

const ChatList = () => {
  const dispatch = useDispatch();
  const showErrorPage = useShowErrorPage();
  const { userId, userType } = useSelector(state => state.auth);
  const { chats, pending, error } = useSelector(state => state.chatList);

  useEffect(() => {
    const url = `/chat_list/${userType}/${userId}`;
    dispatch(fetchChatList({ url }));
  }, [dispatch, userId, userType]);

  useEffect(() => {
    error && showErrorPage(error);
  }, [error]);

  return (
    <div className="routesWrapper">
      <h2>Correspondence</h2>
      {pending && <Loading />}
      {!chats?.length ? (
        <p>No correspondences yet.</p>
      ) : (
        chats.map((chat, index) => (
          <ChatListItem index={index} chat={chat} userType={userType} userId={userId} />
        ))
      )}
    </div>
  );
};

export default ChatList;
