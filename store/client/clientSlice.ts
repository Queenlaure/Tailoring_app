import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ClientType {
  //   id?: string;
  clientName?: string;
  clientEmail?: string;
  clientID?: string;
  address?: string;
  tailor?: boolean;
  contact?: string;
  specialty?: string;
}

interface ClientState {
  user: ClientType;
  users: ClientType[];
}

const initialState: ClientState = {
  user: {} as ClientType,
  users: [] as ClientType[],
};

export const userSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    ClientInfo: (state, action: PayloadAction<ClientType>) => {
      state.user = action.payload;
    },
    ClientsInfo: (state, action: PayloadAction<ClientType[]>) => {
      state.users = action.payload;
    },
    resetClientInfo: (state) => {
      state = initialState;
    },
  },
});

export const { ClientInfo, ClientsInfo, resetClientInfo } = userSlice.actions;
export default userSlice.reducer;
