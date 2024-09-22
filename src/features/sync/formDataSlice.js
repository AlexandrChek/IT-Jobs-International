import { createSlice } from '@reduxjs/toolkit';

const formDataSlice = createSlice({
  name: 'formData',
  initialState: null,
  reducers: {
    saveFormData: (state, action) => {
      state.formData = action.payload;
    },
  },
});

export const { saveFormData } = formDataSlice.actions;
export default formDataSlice.reducer;
