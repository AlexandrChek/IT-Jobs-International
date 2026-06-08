import { getAsterisk } from '../../methods';
import InputBox from '../InputBox';
import MyInput from '../inputs/MyInput';

const EmailInput = ({
  mailName = 'email',
  label = 'E-mail',
  initialEmail = '',
  width = '100%',
  getVal,
  isRequired = false,
  ...rest
}) => {
  const startLabel = `${label}${getAsterisk(isRequired)}`;

  return (
    <InputBox id={mailName} startLabel={startLabel}>
      <MyInput
        type="email"
        id={mailName}
        name={mailName}
        initialValue={initialEmail}
        width={width}
        onBlur={e => getVal?.(e.target.value)}
        required={isRequired}
        {...rest}
      />
    </InputBox>
  );
};

export default EmailInput;
