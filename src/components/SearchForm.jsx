import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchSearchResults } from '../features/async/searchSlice';
import PositionInput from './PositionInput';
import CountryCityInputs from './CountryCityInputs';
import styles from '../styles/components/SearchForm.module.css';

const SearchForm = ({searchType}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [advancedSearch, setAdvancedSearch] = useState(false);
    const searchForm = useRef();

    const search = async (e) => {
        e.preventDefault();

        let formData = new FormData(searchForm.current);
        formData.append('action', 'search');
        formData.append('searchType', searchType);
        const options = {
            method: 'POST',
            body: formData
        };

        try {
            await dispatch(fetchSearchResults(options)).unwrap();
            navigate('/search_res', {state: {searchType}});
        } catch (error) {
            alert(error.message);
        };
    };

    return (
        <form ref={searchForm} className={styles.searchForm} onSubmit={search}>
            <PositionInput />
            <CountryCityInputs />
            {!advancedSearch && <button type="submit">Search</button>}
            <button
            type="button"
            onClick={() => setAdvancedSearch(!advancedSearch)}
            >
            {advancedSearch ? 'Normal search' : 'Advanced search'}
            </button>
            {advancedSearch && (
            searchType === 'job' ? (
                <>
                <label>
                    <input type="checkbox" />
                    Search for any of the words in the “position”
                </label>
                <label>
                    <input type="checkbox" />
                    Relocation from another country is possible
                </label>
                <div className={styles.workplace}>
                    <p>Workplace</p>
                    <label>
                    <input type="checkbox" />
                    office
                    </label>
                    <label>
                    <input type="checkbox" />
                    remote
                    </label>
                    <label>
                    <input type="checkbox" />
                    mixed
                    </label>
                </div>
                <div className={styles.salary}>
                    <p>Salary: from</p>
                    <input type="number" />
                    <span>$</span>
                </div>
                <div className={styles.level}>
                    <p>Level</p>
                    <label>
                    <input type="checkbox" />
                    trainee
                    </label>
                    <label>
                    <input type="checkbox" />
                    junior
                    </label>
                    <label>
                    <input type="checkbox" />
                    middle
                    </label>
                    <label>
                    <input type="checkbox" />
                    senior
                    </label>
                </div>
                <label>
                    <input type="checkbox" />
                    Suitable for candidates without work experience
                </label>
                <button type="submit">Search</button>
                </>
            ) : (
                <>
                <label>
                    <input type="checkbox" />
                    Search for any of the words in the “position”
                </label>
                <label>
                    <input type="checkbox" />
                    Consider relocation to another country
                </label>
                <div className={styles.workplace}>
                    <p>Workplace</p>
                    <label>
                    <input type="checkbox" />
                    office
                    </label>
                    <label>
                    <input type="checkbox" />
                    remote
                    </label>
                    <label>
                    <input type="checkbox" />
                    mixed
                    </label>
                </div>
                <label>
                    Skills
                    <input type="text" placeholder="Enter skills separated by commas" />
                </label>
                <div className={styles.experience}>
                    <p>Work experience: from</p>
                    <input type="number" />
                    <select>
                    <option value="years">years</option>
                    <option value="months">months</option>
                    </select>
                </div>
                <button type="submit">Search</button>
                </>
            )
            )}
        </form>
    );
};

export default SearchForm;