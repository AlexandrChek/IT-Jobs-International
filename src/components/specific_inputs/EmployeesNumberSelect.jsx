import { getAsterisk } from '../../methods';
import { employeesNumbers } from '../../constants';
import SelectBox from '../SelectBox';
import MySelect from '../inputs/MySelect';

const EmployeesNumberSelect = ({ initialValue = '', isRequired = false }) => {
  const label = `Number of employees${getAsterisk(isRequired)}:`;

  return (
    <SelectBox selectId="employeesNumber" label={label}>
      <MySelect
        selectId="employeesNumber"
        name="employeesNumber"
        options={employeesNumbers}
        initialValue={initialValue}
        isRequired={isRequired}
      />
    </SelectBox>
  );
};

export default EmployeesNumberSelect;
