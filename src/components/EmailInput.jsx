import MyInput from './MyInput';

const EmailInput = ({ initialEmail = '' }) => {
  return (
    <div>
      <label htmlFor="email">E-mail</label>
      <MyInput type="email" id="email" name="email" required initialValue={initialEmail} />
    </div>
  );
};

export default EmailInput;
