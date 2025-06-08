import MySelect from './inputs/MySelect';
import { englishLabel, englishLevels } from '../constants';

const EnglishLevelSelect = ({ initialLevel = '' }) => {
  return (
    <div>
      <label htmlFor="englishLevel">{englishLabel}</label>
      <MySelect
        id="englishLevel"
        name="englishLevel"
        options={englishLevels}
        initialValue={initialLevel}
      />
    </div>
  );
};

export default EnglishLevelSelect;
