import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modalState',
  initialState: {
    modalName: null,
  },
  reducers: {
    openModal: (state, action) => {
      state.modalName = action.payload;
    },
    closeModal: state => {
      state.modalName = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
