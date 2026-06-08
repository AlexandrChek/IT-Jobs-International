import { getAsterisk } from '../../methods';
import InputBox from '../InputBox';
import MyInput from '../inputs/MyInput';

const UrlInput = ({
  urlName = 'website',
  label,
  initialValue = '',
  isRequired = false,
  getVal,
  ...rest
}) => {
  return (
    <InputBox id={urlName} startLabel={`${label}${getAsterisk(isRequired)}`}>
      <MyInput
        type="url"
        id={urlName}
        name={urlName}
        initialValue={initialValue}
        required={isRequired}
        placeholder="http(s)://site.com"
        onBlur={e => getVal?.(e.target.value)}
        {...rest}
      />
    </InputBox>
  );
};

export default UrlInput;
