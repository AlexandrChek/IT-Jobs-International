import { createSlice } from '@reduxjs/toolkit';

const passwordsMatchSlice = createSlice({
  name: 'passwordsMatch',
  initialState: { doPasswordsMatch: false },
  reducers: {
    setPasswordsMatch: (state, action) => {
      state.doPasswordsMatch = action.payload;
    },
  },
});

export const { setPasswordsMatch } = passwordsMatchSlice.actions;
export default passwordsMatchSlice.reducer;
