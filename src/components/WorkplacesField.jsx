import MyCheckbox from './MyCheckbox';
import { workplaces } from '../constants';

const WorkplacesField = ({ initialWorkplaces = [] }) => {
  return (
    <fieldset>
      <legend>Workplace</legend>
      {workplaces.map(place => (
        <label>
          <MyCheckbox
            key={place}
            name="workplaces"
            value={place}
            initialState={initialWorkplaces.includes(place)}
          />
          {place}
        </label>
      ))}
    </fieldset>
  );
};

export default WorkplacesField;
