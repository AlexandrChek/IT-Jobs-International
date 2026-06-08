import { useMemo } from 'react';
import { relocationTo, relocationFrom } from '../../constants';

const RelocationOutput = ({ subjectType, ...rest }) => {
  const relocationText = useMemo(() => {
    return subjectType === 'cv' ? relocationTo : relocationFrom;
  }, [subjectType, relocationTo, relocationFrom]);

  return <h5 {...rest}>&#10003; {relocationText}</h5>;
};

export default RelocationOutput;
