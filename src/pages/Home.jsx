import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchType } from '../features/sync/searchTypeSlice';
import AnimatedText from '../components/AnimatedText';
import RadioGroup from '../components/specific_inputs/RadioGroup';
import SearchForm from '../components/SearchForm';
import { searchTypes } from '../constants';
import styles from '../styles/pages/Home.module.css';

const Home = () => {
  const dispatch = useDispatch();
  const { userType } = useSelector(state => state.auth);
  const { searchType } = useSelector(state => state.searchTypeState);
  const currentSearchType = useMemo(() => {
    return searchType || (userType === 'company' ? 'cv' : 'job');
  }, [userType, searchType]);

  const handleTypeChange = val => dispatch(setSearchType(val));

  return (
    <div className="routesWrapper">
      <h2 className={styles.mainTitle}>Job search for IT specialists</h2>
      <div className={styles.animatedTextBox}>
        <AnimatedText>Convenient way to find a job or employees</AnimatedText>
      </div>
      <div className={styles.searchType}>
        <RadioGroup
          arrOfValueObj={searchTypes}
          groupName="searchType"
          legend="Search Type"
          initialVal={currentSearchType}
          isDirectionInline={true}
          getVal={handleTypeChange}
        />
      </div>
      <SearchForm searchType={currentSearchType} />
    </div>
  );
};

export default Home;
