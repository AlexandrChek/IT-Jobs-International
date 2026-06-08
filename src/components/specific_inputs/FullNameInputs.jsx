import InputBox from '../InputBox';
import MyInput from '../inputs/MyInput';

const FullNameInputs = ({ initialFirstName = '', initialLastName = '' }) => {
  return (
    <div className="flexColumnBox">
      <InputBox id="firstName" startLabel="First name*">
        <MyInput
          id="firstName"
          type="text"
          name="firstName"
          initialValue={initialFirstName}
          required
        />
      </InputBox>
      <InputBox id="lastName" startLabel="Last name*">
        <MyInput
          id="lastName"
          type="text"
          name="lastName"
          initialValue={initialLastName}
          required
        />
      </InputBox>
    </div>
  );
};

export default FullNameInputs;
