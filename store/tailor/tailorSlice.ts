import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface TailorType {
  //   id?: string;
  shopName?: string;
  email?: string;
  address?: string;
  specialty?: string;
  tailor?: boolean;
  contact?: string;
}

interface TailorState {
  user: TailorType;
  users: TailorType[];
}

const initialState: TailorState = {
  user: {} as TailorType,
  users: [] as TailorType[],
};

export const userSlice = createSlice({
  name: 'tailor',
  initialState,
  reducers: {
    TailorInfo: (state, action: PayloadAction<TailorType>) => {
      state.user = action.payload;
    },
    TailorsInfo: (state, action: PayloadAction<TailorType[]>) => {
      state.users = action.payload;
    },
    resetTailorInfo: (state) => {
      state = initialState;
    },
  },
});

export const { TailorInfo, TailorsInfo, resetTailorInfo } = userSlice.actions;
export default userSlice.reducer;
