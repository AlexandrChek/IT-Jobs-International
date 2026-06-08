import { Link } from 'react-router-dom';
import { logInLink } from '../constantLinks';
import { userTypes } from '../constants';
import styles from '../styles/pages/SignUp.module.css';

const SignUp = () => {
  return (
    <div className="routesWrapper">
      <h2 className={styles.mainTitle}>Sign Up</h2>
      <h5>as a</h5>
      <div className={styles.options}>
        {userTypes.map(item => (
          <Link key={item.value} to={item.signUpRoute} className={styles.userType}>
            <h2>{item.label}</h2>
          </Link>
        ))}
      </div>
      <p>If you already have an account, please {logInLink}.</p>
    </div>
  );
};

export default SignUp;
