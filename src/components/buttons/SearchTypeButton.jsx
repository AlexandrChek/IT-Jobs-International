const SearchTypeButton = ({ isAdvancedSearch, ...rest }) => {
  return (
    <button type="button" {...rest}>
      {isAdvancedSearch ? 'Ordinary search' : 'Advanced search'}
    </button>
  );
};

export default SearchTypeButton;
