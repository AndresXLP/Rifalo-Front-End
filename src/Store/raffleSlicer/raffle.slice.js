import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RifaloAppApi } from '../../services/rifaloAppApi';

//* THUNKS
export const getAllRaffles = createAsyncThunk('raffle/getAllRaffles', () =>
  RifaloAppApi.getAllRaffles()
);
export const createRaflle = createAsyncThunk(
  'raffle/createRaflle',
  ({ dataFile, formValues }) =>
    RifaloAppApi.createRaffle({ dataFile, formValues })
);
//* SLICE DEFINITION
export const raffleSlice = createSlice({
  name: 'raffle',
  initialState: {
    raffleState: {
      loading: false,
      raffles: [],
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllRaffles.pending, (state) => {
        state.raffleState.loading = true;
      })
      .addCase(getAllRaffles.fulfilled, (state, action) => {
        state.raffleState.raffles = action.payload;
      });
  },
});

export const selectRaffles = (state) => state.raffle.raffleState;

export default raffleSlice.reducer;
