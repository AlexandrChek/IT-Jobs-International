const UserMessage = ({ index, msg, userName }) => {
  return (
    <div key={index}>
      <p>
        {msg.name === userName ? 'You' : msg.name}, {msg.date}
      </p>
      <p>{msg.text}</p>
      {msg.cvFileLink && (
        <a href={msg.cvFileLink} target="_blank">
          Open CV
        </a>
      )}
    </div>
  );
};

export default UserMessage;
