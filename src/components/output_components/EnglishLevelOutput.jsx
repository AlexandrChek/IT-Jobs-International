import { englishLabel } from '../../constants';

const EnglishLevelOutput = ({ level, ...rest }) => {
  return (
    <div {...rest}>
      <h5>{englishLabel}:</h5>
      <p>{level}</p>
    </div>
  );
};

export default EnglishLevelOutput;
