import MyInput from './MyInput';

const CompanyNameInput = ({ initialValue = '', customName = null }) => {
  return (
    <label>
      Company name
      <MyInput
        type="text"
        id="name"
        name={customName ? customName : 'name'}
        required
        initialValue={initialValue}
      />
    </label>
  );
};

export default CompanyNameInput;
