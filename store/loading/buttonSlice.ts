import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  buttonLoading: false,
};

export const buttonSlice = createSlice({
  name: 'buttonLoading',
  initialState,
  reducers: {
    setButtonLoading: (state) => {
      state.buttonLoading = true;
    },
    stopButtonLoading: (state) => {
      state.buttonLoading = false;
    },
  },
});

export const { setButtonLoading, stopButtonLoading } = buttonSlice.actions;
export default buttonSlice.reducer;
