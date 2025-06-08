import MyInput from './inputs/MyInput';

const PositionInput = ({ initialPosition = '', isRequired = false }) => {
  return (
    <div>
      <label htmlFor="position">Position</label>
      <MyInput
        id="position"
        type="text"
        name="position"
        initialValue={initialPosition}
        required={isRequired}
      />
    </div>
  );
};

export default PositionInput;
