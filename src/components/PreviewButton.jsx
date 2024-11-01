import { useDispatch } from 'react-redux';
import { convertFormDataToObj } from '../methods';
import { saveFormData } from '../features/sync/formDataSlice';
import { getCvPreviewObj } from '../features/sync/cvFormSlice';

const PreviewButton = ({ formElem, route, ...rest }) => {
  const dispatch = useDispatch();

  const showPreview = () => {
    if (route.startsWith('/public_cv/')) {
      dispatch(getCvPreviewObj());
    } else {
      const formData = new FormData(formElem);
      let formObj = convertFormDataToObj(formData);

      if (Object.keys(rest).length) {
        formObj = { ...formObj, ...rest };
      }

      dispatch(saveFormData(formObj));
    }

    window.open(route, '_blank');
  };

  return (
    <button type="button" onClick={showPreview}>
      Show preview
    </button>
  );
};

export default PreviewButton;
