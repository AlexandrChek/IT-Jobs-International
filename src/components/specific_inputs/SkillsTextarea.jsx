import { getAsterisk } from '../../methods';
import InputBox from '../InputBox';
import MyTextarea from '../inputs/MyTextarea';

const SkillsTextarea = ({ id, label, initialValue = '', isRequired = false, ...rest }) => {
  const skillsPlaceholder = 'Enter skills separated by commas, for example: React, Vue,...';

  return (
    <InputBox id={id} startLabel={`${label}${getAsterisk(isRequired)}`}>
      <MyTextarea
        id={id}
        name="skills"
        initialValue={initialValue}
        placeholder={skillsPlaceholder}
        required={isRequired}
        {...rest}
      />
    </InputBox>
  );
};

export default SkillsTextarea;
