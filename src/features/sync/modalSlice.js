import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalNameInSlice: null,
  isOpen: false,
  message: null,
  routeAfterClosing: null,
};

const modalSlice = createSlice({
  name: 'modalState',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.modalNameInSlice = action.payload.modalNameInSlice;
      state.message = action.payload.message;
      state.isOpen = true;

      if (action.payload.route) {
        state.routeAfterClosing = action.payload.routeAfterClosing;
      }
    },
    closeModal: state => {
      state.modalNameInSlice = null;
      state.isOpen = false;
      state.message = null;
    },
    clearRoute: state => {
      state.routeAfterClosing = null;
    },
  },
});

export const { openModal, closeModal, clearRoute } = modalSlice.actions;
export default modalSlice.reducer;
