import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchJob, clearJobError } from '../features/async/jobSlice';
import { checkIfChatExists } from '../features/async/chatSlice';
import useShowErrorPage from '../hooks/useShowErrorPage';
import Loading from '../components/Loading';
import JobOwnerMenu from '../components/menus/JobOwnerMenu';
import JobPublicTemplate from '../components/public_templates/JobPublicTemplate';
import CreateChatForm from '../components/CreateChatForm';
import CreateChatFormAlt from '../components/CreateChatFormAlt';
import ChatAlreadyExistsMsg from '../components/ChatAlreadyExistsMsg';
import styles from '../styles/pages/Job.module.css';

const Job = () => {
  const { companyid, jobid } = useParams() || {};
  const dispatch = useDispatch();
  const showErrorPage = useShowErrorPage();
  const { jobData, pending, error } = useSelector(state => state.job);
  const { userId, userName, userType } = useSelector(state => state.auth);
  const { doesChatAlreadyExists } = useSelector(state => state.currentChat);
  const chatUrlEnd = `/${companyid}/${userId}/${jobid}`;

  useEffect(() => {
    const url = `/job/${companyid}/${jobid}`;
    dispatch(fetchJob({ url }));
  }, [companyid, jobid]);

  useEffect(() => {
    if (error?.actionCausedError === 'fetch') {
      showErrorPage(error.message, 'jobNotFound', clearJobError);
    }
  }, [error?.actionCausedError, error?.message]);

  useEffect(() => {
    if (userType === 'seeker') {
      const url = `/check_if_chat_exists${chatUrlEnd}`;
      dispatch(checkIfChatExists({ url }));
    }
  }, [companyid, jobid, userType, userId]);

  return (
    <div className="routesWrapper">
      {pending && <Loading />}
      {jobData && (
        <>
          {companyid === userId && <JobOwnerMenu jobData={jobData} />}
          {jobData.isDisabled && <h3 className={styles.labelDisabled}>Disabled</h3>}
          <JobPublicTemplate
            job={jobData}
            className={userType === 'seeker' || !userType ? styles.jobBox : ''}
          />
          {userType === 'seeker' && !doesChatAlreadyExists && (
            <CreateChatForm
              seekerId={userId}
              companyId={companyid}
              userName={userName}
              userType={userType}
              jobId={jobid}
              position={jobData.position}
            />
          )}
          {!userType && <CreateChatFormAlt offerType="job" />}
          {doesChatAlreadyExists && <ChatAlreadyExistsMsg chatUrlEnd={chatUrlEnd} />}
        </>
      )}
    </div>
  );
};

export default Job;
