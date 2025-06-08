import MyInput from './MyInput';

const UrlInput = ({ labelAndName, initialValue = '', isRequired = false }) => {
  return (
    <label>
      {labelAndName.label}
      <MyInput
        type="url"
        name={labelAndName.name}
        initialValue={initialValue}
        required={isRequired}
        placeholder="http(s)://site.com"
      />
    </label>
  );
};

export default UrlInput;
