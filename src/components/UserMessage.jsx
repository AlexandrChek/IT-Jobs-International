const UserMessage = ({ index, msg, userName }) => {
  return (
    <div key={index}>
      <p>
        {msg.name === userName ? 'You' : msg.name}, {msg.date}
      </p>
      <p>{msg.text}</p>
    </div>
  );
};

export default UserMessage;
