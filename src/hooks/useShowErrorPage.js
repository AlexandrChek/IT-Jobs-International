import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const useShowErrorPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (errorMsg, clearFn) => {
    navigate('/error');
    console.error(errorMsg);
    clearFn && dispatch(clearFn());
  };
};

export default useShowErrorPage;
