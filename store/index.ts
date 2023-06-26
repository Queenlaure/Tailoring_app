import { configureStore } from '@reduxjs/toolkit';
import tailorReducer from './tailor/tailorSlice';
import customerReducer from './customer/customerSlice';
import ordersReducer from './orders/ordersSlice';
// import userReducer from './user/userSlice'
// import postsReducer from './posts/postsSlice'
export const store = configureStore({
  reducer: {
    tailor: tailorReducer,
    customer: customerReducer,
    orders: ordersReducer,
    // user:userReducer,
    // post:postsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
