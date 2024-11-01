import MyInput from './MyInput';

const PositionInput = ({ initialPosition = '', isRequired = false, posName = null }) => {
  return (
    <div>
      <label htmlFor="position">Position</label>
      <MyInput
        id="position"
        type="text"
        name={posName ? posName : 'position'}
        initialValue={initialPosition}
        required={isRequired}
      />
    </div>
  );
};

export default PositionInput;
