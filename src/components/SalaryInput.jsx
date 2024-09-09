import MyInput from "./MyInput"

const SalaryInput = ({initialSalary = ''}) => {
    return (
        <label>Salary
          <MyInput
            type="number"
            name="salary"
            initialValue={initialSalary}
          /> $
        </label>
    )
}

export default SalaryInput