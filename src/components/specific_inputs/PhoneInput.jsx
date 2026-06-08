import { getAsterisk } from '../../methods';
import InputBox from '../InputBox';
import MyInput from '../inputs/MyInput';

const PhoneInput = ({
  label = 'Phone number',
  phoneName = 'phone',
  initialPhone = '',
  isRequired = false,
  getVal,
  ...rest
}) => {
  const startLabel = `${label}${getAsterisk(isRequired)}`;

  return (
    <InputBox id={phoneName} startLabel={startLabel}>
      <MyInput
        type="tel"
        id={phoneName}
        name={phoneName}
        required={isRequired}
        initialValue={initialPhone}
        onBlur={e => getVal?.(e.target.value)}
        {...rest}
      />
    </InputBox>
  );
};

export default PhoneInput;
