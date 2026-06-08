import { forwardRef } from 'react';
import useControlledInputScript from '../../hooks/useControlledInputScript';

const MyTextarea = forwardRef(
  ({ id = null, initialValue = '', width = '100%', getTargetOnChange, ...rest }, ref) => {
    const { value, handleChange } = useControlledInputScript(initialValue, getTargetOnChange);

    return (
      <textarea
        id={id}
        value={value}
        onChange={e => handleChange(e.target)}
        style={{ width }}
        ref={ref}
        {...rest}
      />
    );
  },
);

export default MyTextarea;
