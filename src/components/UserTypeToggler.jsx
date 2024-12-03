import { userTypes } from '../constants';

const UserTypeToggler = () => {
  return (
    <fieldset>
      <legend>Who are uoy?</legend>
      {userTypes.map(item => (
        <label key={item.value}>
          <input type="radio" name="userType" value={item.value} required /> {item.label}
        </label>
      ))}
    </fieldset>
  );
};

export default UserTypeToggler;
