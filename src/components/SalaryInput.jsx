import MyInput from './inputs/MyInput';

const SalaryInput = ({ initialSalary = '' }) => {
  return (
    <label>
      Salary
      <MyInput type="number" name="salary" initialValue={initialSalary} /> $
    </label>
  );
};

export default SalaryInput;
