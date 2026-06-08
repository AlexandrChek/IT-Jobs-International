import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useShowErrorPage from '../hooks/useShowErrorPage';
import Loading from '../components/Loading';
import LinksList from '../components/LinksList';
import styles from '../styles/pages/SearchResults.module.css';

const SearchResults = () => {
  const { searchtype } = useParams() || {};
  const { searchRes, pending, error } = useSelector(state => state.searchResults);
  const showErrorPage = useShowErrorPage();

  useEffect(() => {
    error && showErrorPage(error);
  }, [error]);

  return (
    <div className="routesWrapper">
      {pending && <Loading />}
      <h2 className={styles.resultsTitle}>Search Results</h2>
      {searchRes &&
        (typeof searchRes !== 'string' ? (
          <LinksList cvsOrJobs={searchRes} type={searchtype} itemsPerPage={5} />
        ) : (
          <h3>{searchRes}</h3>
        ))}
    </div>
  );
};

export default SearchResults;
