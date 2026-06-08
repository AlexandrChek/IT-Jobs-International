import InputBox from '../InputBox';
import MyInput from '../inputs/MyInput';

const CompanyNameInput = ({ inputName = 'companyName', initialValue = '' }) => {
  return (
    <InputBox id={inputName} startLabel="Company name*">
      <MyInput id={inputName} type="text" name={inputName} initialValue={initialValue} required />
    </InputBox>
  );
};

export default CompanyNameInput;
