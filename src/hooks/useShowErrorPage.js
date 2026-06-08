import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const useShowErrorPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (errorMsg, customMsg = '', clearFn) => {
    const route = customMsg ? `/error?custom_msg=${customMsg}` : '/error';
    navigate(route);
    console.error(errorMsg);
    clearFn && dispatch(clearFn());
  };
};

export default useShowErrorPage;
