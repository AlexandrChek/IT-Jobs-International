import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchSearchResults } from '../features/async/searchSlice';
import { createPostReqSettings } from '../methods';
import { workplaces } from '../constants';
import AdjoinedCheckbox from './specific_inputs/AdjoinedCheckbox';
import MyInput from './inputs/MyInput';
import SubmitButton from './buttons/SubmitButton';
import SearchTypeButton from './buttons/SearchTypeButton';
import SkillsTextarea from './specific_inputs/SkillsTextarea';
import InputBox from './InputBox';
import CountryCityInputs from './specific_inputs/CountryCityInputs';
import CheckboxGroup from './specific_inputs/CheckboxGroup';
import RelocationPossibilityCheckbox from './specific_inputs/RelocationPossibilityCheckbox';
import ExperienceIsNotRequiredCheckbox from './specific_inputs/ExperienceIsNotRequiredCheckbox';
import ExperienceFromField from './specific_inputs/ExperienceFromField';
import EnglishLevelSelect from './specific_inputs/EnglishLevelSelect';
import styles from '../styles/components/SearchForm.module.css';

const SearchForm = ({ searchType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const searchForm = useRef();

  const search = async e => {
    e.preventDefault();

    const formData = new FormData(searchForm.current);
    const settings = createPostReqSettings(`/search/${searchType}`, formData);

    dispatch(fetchSearchResults(settings));
    navigate(`/search_res/${searchType}`);
  };

  return (
    <form ref={searchForm} className={`flexColumnBox ${styles.searchForm}`} onSubmit={search}>
      <AdjoinedCheckbox
        label="Search for any of the words in the “position”"
        name="searchOfAnyWord"
      >
        <InputBox id="positionSearch" startLabel="Position">
          <MyInput type="text" name="position" id="positionSearch" />
        </InputBox>
      </AdjoinedCheckbox>
      <CountryCityInputs />
      {isAdvancedSearch && (
        <>
          <InputBox id="salarySearch" startLabel="Salary" endLabel=" $">
            <MyInput type="number" id="salarySearch" name="salary" width="170px" />
          </InputBox>
          <CheckboxGroup
            groupName="workplaces"
            legend="Workplace"
            allValues={workplaces}
            isDirectionInline={true}
          />
          <RelocationPossibilityCheckbox docType={searchType} />
          <AdjoinedCheckbox label="Have at least one of the listed skills" name="searchOfAnySkill">
            <SkillsTextarea id="searchSkills" label="Key skills" />
          </AdjoinedCheckbox>
          {searchType === 'job' ? (
            <ExperienceIsNotRequiredCheckbox />
          ) : (
            <>
              <ExperienceFromField />
              <EnglishLevelSelect />
            </>
          )}
        </>
      )}
      <div className="inlineCenteredFlexBox">
        <SubmitButton>Search</SubmitButton>
        <SearchTypeButton isAdvancedSearch={isAdvancedSearch} setSearchType={setIsAdvancedSearch} />
      </div>
    </form>
  );
};

export default SearchForm;
