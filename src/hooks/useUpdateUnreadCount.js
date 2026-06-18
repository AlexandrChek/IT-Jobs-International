import { useDispatch } from 'react-redux';
import { updateUnreadCount } from '../features/async/authSlice';

const useUpdateUnreadCount = () => {
  const dispatch = useDispatch();

  return (userType, userId) => {
    const url = `/user_unread_msg_count/${userType}/${userId}`;
    dispatch(updateUnreadCount({ url }));
  };
};

export default useUpdateUnreadCount;
