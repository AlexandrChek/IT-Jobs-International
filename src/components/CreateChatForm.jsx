import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createChat, clearError } from '../features/async/chatSlice';
import { createPostReqSettings } from '../methods';
import MyTextarea from './inputs/MyTextarea';
import JobSelect from './specific_inputs/JobSelect';
import CvFileInput from './specific_inputs/CvFileInput';
import SubmitButton from './buttons/SubmitButton';
import ErrorModal from './modals/ErrorModal';
import styles from '../styles/components/CreateChatForm.module.css';

const CreateChatForm = ({ seekerId, companyId, userName, userType, jobId = '', position = '' }) => {
  const dispatch = useDispatch();
  const { error } = useSelector(state => state.currentChat);
  const form = useRef();
  const jobIdRef = useRef(jobId);
  const isCompany = userType === 'company';

  const getJobId = id => {
    jobIdRef.current = id;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!jobIdRef.current) return;

    const formData = new FormData(form.current);
    formData.append('seekerId', seekerId);
    formData.append('companyId', companyId);
    formData.append('userName', userName);
    formData.append('userType', userType);
    formData.append('jobId', jobIdRef.current);
    position && formData.append('position', position);
    formData.append('date', Date.now());

    const settings = createPostReqSettings('/create_chat', formData);

    const creatingResult = await dispatch(createChat(settings));

    if (createChat.fulfilled.match(creatingResult)) {
      alert('Message sent successfully');
    }
  };

  return (
    <>
      <h4 className={styles.offerTitle}>{isCompany ? 'Offer a job' : 'Apply for a job'}</h4>
      <form ref={form} onSubmit={handleSubmit} className="flexColumnBox">
        <MyTextarea name="message" placeholder="Write a message*" required />
        {isCompany ? (
          <JobSelect companyId={companyId} seekerId={seekerId} getJobId={getJobId} />
        ) : (
          <CvFileInput />
        )}
        <SubmitButton newClass={styles.submitBtn}>
          {isCompany ? 'Send message' : 'Apply'}
        </SubmitButton>
      </form>
      <ErrorModal
        error={error?.actionCausedError === 'create' && error.message}
        parentName="CreateChatForm"
        actionAfterClosing={() => dispatch(clearError())}
        customMsg={error?.multerError ? error.message : null}
      />
    </>
  );
};

export default CreateChatForm;
