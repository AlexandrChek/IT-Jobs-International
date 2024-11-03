import MyCheckbox from './inputs/MyCheckbox';
import { relocationFrom, relocationTo } from '../constants';

const RelocationPossibilityCheckbox = ({ docType, initialState = '' }) => {
  return (
    <label>
      <MyCheckbox name="isRelocationPossible" initialState={initialState} />
      {docType === 'job' ? relocationFrom : relocationTo}
    </label>
  );
};

export default RelocationPossibilityCheckbox;
