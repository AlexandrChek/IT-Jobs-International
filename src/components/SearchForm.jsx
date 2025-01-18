import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchSearchResults } from '../features/async/searchSlice';
import { createPostReqSettings } from '../methods';
import MyCheckbox from './inputs/MyCheckbox';
import PositionInput from './PositionInput';
import CountryCityInputs from './CountryCityInputs';
import SalaryInput from './SalaryInput';
import WorkplacesField from './WorkplacesField';
import RelocationPossibilityCheckbox from './RelocationPossibilityCheckbox';
import ExperienceIsNotRequiredCheckbox from './ExperienceIsNotRequiredCheckbox';
import ExperienceFromField from './ExperienceFromField';
import SkillsTextarea from './SkillsTextarea';
import EnglishLevelSelect from './EnglishLevelSelect';
import SearchTypeButton from './buttons/SearchTypeButton';
import styles from '../styles/components/SearchForm.module.css';

const SearchForm = ({ searchType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const searchForm = useRef();

  const search = async e => {
    e.preventDefault();

    const formData = new FormData(searchForm.current);
    const settings = createPostReqSettings(`/search/${searchType}`, formData);

    dispatch(fetchSearchResults(settings));
    navigate('/search_res', { state: { searchType } });
  };

  return (
    <form ref={searchForm} className={styles.searchForm} onSubmit={search}>
      <PositionInput />
      <CountryCityInputs />
      {advancedSearch && (
        <>
          <label>
            <MyCheckbox name="searchOfAnyWord" />
            Search for any of the words in the “position”
          </label>
          <SalaryInput />
          <WorkplacesField />
          <RelocationPossibilityCheckbox docType={searchType} />
          {searchType === 'job' ? (
            <ExperienceIsNotRequiredCheckbox />
          ) : (
            <>
              <ExperienceFromField />
              <SkillsTextarea />
              <EnglishLevelSelect />
            </>
          )}
        </>
      )}
      <div>
        <button type="submit">Search</button>
        <SearchTypeButton onClick={() => setAdvancedSearch(!advancedSearch)} />
      </div>
    </form>
  );
};

export default SearchForm;
