const SearchTypeButton = ({ isAdvancedSearch, setSearchType }) => {
  return (
    <button
      type="button"
      className="standardButton"
      onClick={() => setSearchType(!isAdvancedSearch)}
    >
      {isAdvancedSearch ? 'Ordinary search' : 'Advanced search'}
    </button>
  );
};

export default SearchTypeButton;
