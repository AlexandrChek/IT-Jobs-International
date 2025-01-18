import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import LinksList from '../components/LinksList';
import styles from '../styles/pages/SearchRes.module.css';

const SearchResults = () => {
  const { state } = useLocation();
  const { searchRes, pending, error } = useSelector(state => state.searchResults);

  return (
    <div className="routesWrapper">
      <h2>Search Results</h2>
      {pending && <Loading />}
      {searchRes &&
        (typeof searchRes !== 'string' ? (
          <LinksList cvsOrJobs={searchRes} type={state.searchType} />
        ) : (
          <h3>{searchRes}</h3>
        ))}
      {error && <h3>{error}</h3>}
    </div>
  );
};

export default SearchResults;
