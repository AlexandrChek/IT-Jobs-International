import MyInput from './inputs/MyInput';

const CompanyNameInput = ({ initialValue = '' }) => {
  return (
    <label>
      Company name
      <MyInput type="text" name="companyName" required initialValue={initialValue} />
    </label>
  );
};

export default CompanyNameInput;
