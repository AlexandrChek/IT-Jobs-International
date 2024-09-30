import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import LinksList from '../components/LinksList';
import styles from '../styles/pages/SearchRes.module.css';

const SearchResults = () => {
  const { state } = useLocation();
  const { searchRes, pending } = useSelector((state) => state.searchResults);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (typeof searchRes === 'string') {
      setNotFound(true);
    }
  }, [searchRes]);

  return (
    <div className="routesWrapper">
      <h2>Search Results</h2>
      {pending && <Loading />}
      {notFound && <h3>{searchRes}</h3>}
      {searchRes && !notFound && <LinksList cvsOrJobs={searchRes} type={state.searchType} />}
    </div>
  );
};

export default SearchResults;
