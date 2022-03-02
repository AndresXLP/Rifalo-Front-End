import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlicer/user.slice';
import raffleReducer from './raffleSlicer/raffle.slice';
export const store = configureStore({
  reducer: {
    user: userReducer,
    raffle: raffleReducer,
  },
});
