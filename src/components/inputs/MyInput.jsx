import useControlledInputScript from '../../hooks/useControlledInputScript';

const MyInput = ({ id = null, width = '100%', initialValue = '', getTargetOnChange, ...rest }) => {
  const { value, handleChange } = useControlledInputScript(initialValue, getTargetOnChange);

  return (
    <input
      id={id}
      value={value}
      onChange={e => handleChange(e.target)}
      style={{ width }}
      {...rest}
    />
  );
};

export default MyInput;
