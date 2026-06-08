import InputBox from '../InputBox';
import MyInput from '../inputs/MyInput';

const PasswordInput = ({
  id = 'password',
  label = 'Password*',
  getVal,
  isError = false,
  ...rest
}) => {
  return (
    <InputBox id={id} startLabel={label}>
      <MyInput
        id={id}
        type="password"
        minLength="3"
        getTargetOnChange={target => getVal?.(target.value)}
        className={isError ? 'inputError' : null}
        required
        {...rest}
      />
    </InputBox>
  );
};

export default PasswordInput;
