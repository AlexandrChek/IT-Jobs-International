import MyCheckbox from './MyCheckbox';
import { workplaces } from '../constants';

const WorkplacesField = ({ initialWorkplaces = [] }) => {
  return (
    <fieldset>
      <legend>Workplace</legend>
      {workplaces.map((place) => (
        <>
          <MyCheckbox
            key={place}
            name="workplaces"
            value={place}
            initialState={initialWorkplaces.includes(place)}
          />{' '}
          {place}
        </>
      ))}
    </fieldset>
  );
};

export default WorkplacesField;
