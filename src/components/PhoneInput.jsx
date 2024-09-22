import MyInput from './MyInput';

const PhoneInput = ({ initialPhone = '', isRequired = false }) => {
  return (
    <div>
      <label htmlFor="phone">Phone number</label>
      <MyInput
        type="tel"
        id="phone"
        name="phone"
        required={isRequired}
        initialValue={initialPhone}
      />
    </div>
  );
};

export default PhoneInput;
