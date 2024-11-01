import { userTypes } from '../constants';

const UserTypeToggler = () => {
  return (
    <fieldset>
      <legend>Who are uoy?</legend>
      {userTypes.map(item => (
        <label key={item}>
          <input type="radio" name="userType" value={item} required /> {item}
        </label>
      ))}
    </fieldset>
  );
};

export default UserTypeToggler;
