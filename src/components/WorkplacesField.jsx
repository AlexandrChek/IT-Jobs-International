import MyCheckbox from './inputs/MyCheckbox';
import { workplaces } from '../constants';

const WorkplacesField = ({ initialWorkplaces = [] }) => {
  return (
    <fieldset>
      <legend>Workplace</legend>
      {workplaces.map(place => (
        <label key={place}>
          <MyCheckbox
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
