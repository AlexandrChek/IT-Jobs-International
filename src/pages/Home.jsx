import { useState } from 'react';
import SearchForm from '../components/SearchForm';
import { searchTypes } from '../constants';
import styles from '../styles/pages/Home.module.css';

const Home = () => {
  const [searchType, setSearchType] = useState('job');

  return (
    <div className={styles.home}>
      <h1>Job search for IT specialists</h1>
      <div className={styles.animatedText}>
        Convenient way to find a job or employees
      </div>
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
