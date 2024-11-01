import { createSlice } from '@reduxjs/toolkit';
import {
  convertFormDataToObj,
  normalizeExperienceInPreviewData,
  countTotalExperience,
} from '../../methods';

const cvFormSlice = createSlice({
  name: 'cvForm',
  initialState: { formRef: null, totalWorkExperience: null, cvPreviewObj: null },
  reducers: {
    setCvFormRef: (state, action) => {
      state.cvForm.formRef = action.payload;
    },
    countWorkExperience: state => {
      const formData = new FormData(state.formRef);
      const cvObj = convertFormDataToObj(formData);
      const cvObjWithNormalWorkBlock = normalizeExperienceInPreviewData(cvObj, 'work');
      state.totalWorkExperience = countTotalExperience(cvObjWithNormalWorkBlock.work);
      state.cvPreviewObj = cvObjWithNormalWorkBlock;
    },
    getCvPreviewObj: state => {
      if (state.cvPreviewObj) {
        if (state.cvPreviewObj.education_from_0) {
          state.cvPreviewObj = normalizeExperienceInPreviewData(state.cvPreviewObj, 'education');
        }
        state.cvPreviewObj.totalWorkExperience = state.totalWorkExperience;
      } else {
        const formData = new FormData(state.formRef);
        const cvObj = convertFormDataToObj(formData);

        if (cvObj.education_from_0) {
          state.cvPreviewObj = normalizeExperienceInPreviewData(cvObj, 'education');
        } else {
          state.cvPreviewObj = cvObj;
        }
      }
    },
  },
});

export const { setCvFormRef, countWorkExperience, getCvPreviewObj } = cvFormSlice.actions;
export default cvFormSlice.reducer;
