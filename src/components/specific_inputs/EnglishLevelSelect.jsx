import { getAsterisk } from '../../methods';
import { englishLabel, englishLevels } from '../../constants';
import SelectBox from '../SelectBox';
import MySelect from '../inputs/MySelect';

const EnglishLevelSelect = ({ initialLevel = '', isRequired = false, ...rest }) => {
  const label = `${englishLabel}${getAsterisk(isRequired)}:`;

  return (
    <SelectBox selectId="enLevelSelect" label={label}>
      <MySelect
        selectId="enLevelSelect"
        name="englishLevel"
        options={englishLevels}
        initialValue={initialLevel}
        emptyOption="Select the level"
        isRequired={isRequired}
        {...rest}
      />
    </SelectBox>
  );
};

export default EnglishLevelSelect;
