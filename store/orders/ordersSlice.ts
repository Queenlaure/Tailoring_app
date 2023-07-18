import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface Shirt {
  chest: string;
  waist: string;
  seat: string;
  bicep: string;
  shirtLength: string;
  shoulderWidth: string;
  sleeveLength: string;
  cuffCircumference: string;
  collarSize: string;
  charge: string;
  // imageUrl: string;
}
interface Gown {
  gownLength: string;
  upperChest: string;
  chest: string;
  waist: string;
  stomach: string;
  hips: string;
  shoulder: string;
  frontNeckDepth: string;
  sleeveLength: string;
  sleevesRound: string;
  armHoles: string;
  charge: string;
  // imageUrl: string;
}
interface Agbada {
  neck: string;
  shoulder: string;
  chest: string;
  waist: string;
  thigh: string;
  hips: string;
  knee: string;
  calf: string;
  ankle: string;
  bicep: string;
  wrist: string;
  charge: string;
  // imageUrl: string;
}
interface Pants {
  waist: string;
  outseam: string;
  inseam: string;
  frontRise: string;
  backRise: string;
  hips: string;
  thigh: string;
  knee: string;
  sura: string;
  legOpening: string;
  length: string;
  charge: string;
  // imageUrl: string;
}
interface Jumpsuit {
  shoulders: string;
  sleeveLength: string;
  chest: string;
  hips: string;
  thigh: string;
  knee: string;
  inseam: string;
  cuff: string;
  charge: string;
  // imageUrl: string;
}
interface Suit {
  neck: string;
  shoulder: string;
  armHole: string;
  chest: string;
  burst: string;
  waist: string;
  armLength: string;
  hips: string;
  crutchDepth: string;
  backWidth: string;
  bicep: string;
  wrist: string;
  charge: string;
  // imageUrl: string;
}
interface Jacket {
  shoulder: string;
  sleeveLength: string;
  chest: string;
  waist: string;
  centerBack: string;
  charge: string;
  // imageUrl: string;
}
interface Blouse {
  backLength: string;
  fullShoulder: string;
  shoulderStrap: string;
  backNeckDepth: string;
  frontNeckDepth: string;
  shoulderToApex: string;
  frontLength: string;
  chest: string;
  waist: string;
  sleeveLength: string;
  armHole: string;
  sleeveRound: string;
  armRound: string;
  charge: string;
  // imageUrl: string;
}

export interface OrdersType {
  customerName: string;
  tailorEmail?: string;
  urgent?: boolean;
  completed?: boolean;
  imageUrl: string;
  id: string;
  dueDate: timeType;
  shirt?: Shirt;
  gown?: Gown;
  agbada?: Agbada;
  pants?: Pants;
  jumpsuit?: Jumpsuit;
  suit?: Suit;
  jacket?: Jacket;
  blouse?: Blouse;
}

interface timeType {
  nanoseconds: number;
  seconds: number;
}
interface OrdersState {
  orders: OrdersType[];
}

const initialState: OrdersState = {
  orders: [] as OrdersType[],
};
export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    ordersInfo: (state, action: PayloadAction<OrdersType[]>) => {
      state.orders = action.payload;
    },
    resetOrdersInfo: (state) => {
      state = initialState;
    },
  },
});

export const { ordersInfo, resetOrdersInfo } = ordersSlice.actions;
export default ordersSlice.reducer;
