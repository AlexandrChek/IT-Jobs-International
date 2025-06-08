import MyCheckbox from './inputs/MyCheckbox';
import { relocationFrom, relocationTo } from '../constants';

const RelocationPossibilityCheckbox = ({ docType, initialState = '' }) => {
  return (
    <fieldset>
      <legend>Relocation</legend>
      <label>
        <MyCheckbox name="isRelocationPossible" initialState={initialState} />
        {docType === 'job' ? relocationFrom : relocationTo}
      </label>
    </fieldset>
  );
};

export default RelocationPossibilityCheckbox;
