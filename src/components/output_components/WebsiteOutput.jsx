const WebsiteOutput = ({ title, siteUrl, linkText = '', ...rest }) => {
  return (
    <div {...rest}>
      <h5>{title}</h5>
      <a href={siteUrl} target="_blank">
        {linkText ? linkText : siteUrl}
      </a>
    </div>
  );
};

export default WebsiteOutput;
