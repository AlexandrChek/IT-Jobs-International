import {
  convertFormDataToObj,
  normalizeExperienceInPreviewData,
  countTotalExperience,
} from '../../methods';

const PreviewButton = ({ formElem, route, isDisabled = false, newClass = null, ...rest }) => {
  const showPreview = () => {
    const formData = new FormData(formElem);
    let formObj = convertFormDataToObj(formData);

    if (route.startsWith('/cv/') && route.endsWith('/preview')) {
      if (formObj?.work_from_0) {
        formObj = normalizeExperienceInPreviewData(formObj, 'work');
        formObj.totalWorkExperience = countTotalExperience(formObj.work);
      }

      if (formObj?.education_from_0) {
        formObj = normalizeExperienceInPreviewData(formObj, 'education');
      }
    }

    if (route === '/job_preview' && formObj?.country) {
      const country = formObj.country;
      const city = formObj.city || '';
      formObj.location = `${country}${city && `, ${city}`}`;
    }

    if (Object.keys(rest).length) {
      formObj = { ...formObj, ...rest };
    }

    localStorage.setItem('previewData', JSON.stringify(formObj));
    window.open(`/#${route}`, '_blank');
  };

  return (
    <button
      type="button"
      className={`standardButton ${newClass}`}
      disabled={isDisabled}
      onClick={showPreview}
    >
      Show preview
    </button>
  );
};

export default PreviewButton;
