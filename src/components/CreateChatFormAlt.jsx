import { useMemo } from 'react';
import { regLink, logInLink } from '../constantLinks';

const CreateChatFormAlt = ({ offerType }) => {
  const { supposedDesire, allowedUserType } = useMemo(() => {
    const isCv = offerType === 'cv';
    return {
      supposedDesire: isCv ? 'offer' : 'apply for',
      allowedUserType: isCv ? 'company' : 'job seeker',
    };
  }, [offerType]);

  return (
    <p>
      If you wont to {supposedDesire} a job, please {logInLink} or {regLink} as a {allowedUserType}.
    </p>
  );
};

export default CreateChatFormAlt;
