import {configureStore} from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import offerSlice from './slices/offerSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    offer: offerSlice,
  },
});
