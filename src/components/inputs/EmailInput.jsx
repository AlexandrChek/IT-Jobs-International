import MyInput from './MyInput';

const EmailInput = ({ initialEmail = '', getVal }) => {
  return (
    <label>
      E-mail
      <MyInput
        type="email"
        id="email"
        name="email"
        required
        initialValue={initialEmail}
        onBlur={e => {
          if (getVal) {
            getVal(e.target.value);
          }
        }}
      />
    </label>
  );
};

export default EmailInput;
