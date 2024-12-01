const SearchTypeButton = ({ advancedSearch, ...rest }) => {
  return (
    <button type="button" {...rest}>
      {advancedSearch ? 'Normal search' : 'Advanced search'}
    </button>
  );
};

export default SearchTypeButton;
