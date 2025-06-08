import { employeesNumbers } from '../constants';
import MySelect from './inputs/MySelect';

const EmployeesNumberSelect = ({ initialValue = '' }) => {
  return (
    <div>
      <label htmlFor="employeesNumber">Number of employees:</label>
      <MySelect
        id="employeesNumber"
        name="employeesNumber"
        options={employeesNumbers}
        initialValue={initialValue}
      />
    </div>
  );
};

export default EmployeesNumberSelect;
