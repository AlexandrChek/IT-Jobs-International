import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createChat, clearError } from '../features/async/chatSlice';
import { createPostReqSettings } from '../methods';
import MyTextarea from './inputs/MyTextarea';
import JobSelect from './JobSelect';
import ErrorModal from './modals/ErrorModal';

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
    if (position) {
      formData.append('position', position);
    }
    formData.append('date', new Date().toLocaleString());

    const settings = createPostReqSettings('/create_chat', formData);

    const creatingResult = await dispatch(createChat(settings));

    if (createChat.fulfilled.match(creatingResult)) {
      alert('Message sent successfully');
    }
  };

  return (
    <>
      <h4>{isCompany ? 'Offer a job' : 'Apply for a job'}</h4>
      <form ref={form} onSubmit={handleSubmit}>
        <MyTextarea name="message" placeholder="Write a message" required />
        {isCompany ? (
          <JobSelect companyId={companyId} getJobId={getJobId} />
        ) : (
          <label>
            Upload your CV file
            <input type="file" name="cvFile" />
          </label>
        )}
        <button type="submit">{isCompany ? 'Send the message' : 'Apply'}</button>
      </form>
      <ErrorModal
        error={error?.actionCausedError === 'create' && error.message}
        parentName="CreateChatForm"
        actionAfterClosing={() => dispatch(clearError())}
      />
    </>
  );
};

export default CreateChatForm;
