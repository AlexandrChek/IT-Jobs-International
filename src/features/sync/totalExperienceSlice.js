import { createSlice } from '@reduxjs/toolkit';
import { normalizeExperienceInPreviewData, countTotalExperience } from '../../methods';

const totalExperienceSlice = createSlice({
  name: 'totalExperience',
  initialState: {
    doesExperienceNeedAnUpdate: false,
    totalWorkExperience: null,
  },
  reducers: {
    turnOnExperienceUpdate: state => {
      state.doesExperienceNeedAnUpdate = true;
    },
    countWorkExperience: (state, action) => {
      const normCvObj = normalizeExperienceInPreviewData(action.payload, 'work');
      state.totalWorkExperience = countTotalExperience(normCvObj.work);
      state.doesExperienceNeedAnUpdate = false;
    },
  },
});

export const { turnOnExperienceUpdate, countWorkExperience } = totalExperienceSlice.actions;
export default totalExperienceSlice.reducer;
