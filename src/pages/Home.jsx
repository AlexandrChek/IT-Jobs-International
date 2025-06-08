import { useState } from 'react';
import { useSelector } from 'react-redux';
import SearchForm from '../components/SearchForm';
import { searchTypes } from '../constants';
import styles from '../styles/pages/Home.module.css';

const Home = () => {
  const { userType } = useSelector(state => state.auth);
  const [searchType, setSearchType] = useState(userType === 'company' ? 'cv' : 'job');

  return (
    <div className="routesWrapper">
      <h2>Job search for IT specialists</h2>
      <div className={styles.animatedText}>Convenient way to find a job or employees</div>
      <div className={styles.searchType}>
        {searchTypes.map(item => (
          <label key={item.type}>
            <input
              type="radio"
              name="searchType"
              value={item.type}
              checked={searchType === item.type}
              onChange={() => setSearchType(item.type)}
            />
            {item.label}
          </label>
        ))}
      </div>
      <SearchForm searchType={searchType} />
    </div>
  );
};

export default Home;
