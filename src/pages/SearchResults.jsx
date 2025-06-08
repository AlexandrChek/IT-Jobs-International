import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useShowErrorPage from '../hooks/useShowErrorPage';
import Loading from '../components/Loading';
import LinksList from '../components/LinksList';
import styles from '../styles/pages/SearchRes.module.css';

const SearchResults = () => {
  const { searchtype } = useParams() || {};
  const { searchRes, pending, error } = useSelector(state => state.searchResults);
  const showErrorPage = useShowErrorPage();

  useEffect(() => {
    error && showErrorPage(error);
  }, [error]);

  return (
    <div className="routesWrapper">
      <h2>Search Results</h2>
      {pending && <Loading />}
      {searchRes &&
        (typeof searchRes !== 'string' ? (
          <LinksList cvsOrJobs={searchRes} type={searchtype} />
        ) : (
          <h3>{searchRes}</h3>
        ))}
    </div>
  );
};

export default SearchResults;
