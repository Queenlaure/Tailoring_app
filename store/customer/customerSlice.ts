import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface CustomerType {
  category?: string;
  email?: string;
  address?: string;
  name?: string;
  number?: string;
  tailorEmail?: string;
  tailorName?: string;
}
interface CustomerState {
  customers: CustomerType[];
}

const initialState: CustomerState = {
  customers: [] as CustomerType[],
};
export const userSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    customersInfo: (state, action: PayloadAction<CustomerType[]>) => {
      state.customers = action.payload;
    },
    resetCustomerInfo: (state) => {
      state = initialState;
    },
  },
});

export const { customersInfo, resetCustomerInfo } = userSlice.actions;
export default userSlice.reducer;
