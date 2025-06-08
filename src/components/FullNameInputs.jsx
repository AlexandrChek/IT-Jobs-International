import MyInput from './inputs/MyInput';

const FullNameInputs = ({ initialFirstName = '', initialLastName = '' }) => {
  return (
    <div>
      <label htmlFor="firstName">First name</label>
      <MyInput
        id="firstName"
        type="text"
        name="firstName"
        initialValue={initialFirstName}
        required
      />
      <label htmlFor="lastName">Last name</label>
      <MyInput id="lastName" type="text" name="lastName" initialValue={initialLastName} required />
    </div>
  );
};

export default FullNameInputs;
