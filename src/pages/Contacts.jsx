import { contacts } from '../constants';
import styles from '../styles/pages/Contacts.module.css';

const Contacts = () => {
  return (
    <div className={`routesWrapper ${styles.contacts}`}>
      <h2>Contacts</h2>
      <p>Phones: {contacts.phones}</p>
      <fieldset>
        <legend>E-mails</legend>
        {contacts.emails.map(email => (
          <p key={email.email}>
            {email.label} {email.email}
          </p>
        ))}
      </fieldset>
    </div>
  );
};

export default Contacts;
