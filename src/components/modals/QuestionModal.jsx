import Modal from './Modal';

const QuestionModal = ({ modalNameProp, question, btnData }) => {
  return (
    <Modal modalNameProp={modalNameProp} message={question}>
      <div className="inlineCenteredFlexBox">
        {btnData.map(item => (
          <button key={item.text} className="standardButton" onClick={item.fn}>
            {item.text}
          </button>
        ))}
      </div>
    </Modal>
  );
};

export default QuestionModal;
