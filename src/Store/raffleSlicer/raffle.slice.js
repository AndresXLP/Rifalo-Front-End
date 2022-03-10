import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RifaloAppApi } from '../../services/rifaloAppApi';

//* THUNKS
export const getAllRaffles = createAsyncThunk('raffle/getAllRaffles', () =>
  RifaloAppApi.getAllRaffles()
);
export const getRaffleById = createAsyncThunk('raffle/getRaffleById', (id) =>
  RifaloAppApi.getRaffleById(id)
);
export const createRaflle = createAsyncThunk(
  'raffle/createRaflle',
  ({ dataFile, formValues }) =>
    RifaloAppApi.createRaffle({ dataFile, formValues })
);
export const updateRaffleNumber = createAsyncThunk(
  'raffle/updateRaffleNumber',
  (data) => RifaloAppApi.updateRaffleNumber(data)
);

//* SLICE DEFINITION
export const raffleSlice = createSlice({
  name: 'raffle',
  initialState: {
    raffleState: {
      loading: true,
      raffles: [],
      raffle: {},
      raffleReserved: '',
      idRaffle: '',
    },
  },
  reducers: {
    clear(state) {
      state.raffleState.raffleReserved = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRaflle.pending, (state) => {
        state.raffleState.loading = true;
      })
      .addCase(createRaflle.fulfilled, (state, action) => {
        state.raffleState.loading = false;
        state.raffleState.idRaffle = action.payload;
      })
      .addCase(getAllRaffles.pending, (state) => {
        state.raffleState.loading = true;
      })
      .addCase(getAllRaffles.fulfilled, (state, action) => {
        state.raffleState.loading = false;
        state.raffleState.raffles = action.payload;
      })
      .addCase(getRaffleById.pending, (state) => {
        state.raffleState.loading = true;
      })
      .addCase(getRaffleById.fulfilled, (state, action) => {
        state.raffleState.loading = false;
        state.raffleState.raffle = action.payload;
      })
      .addCase(updateRaffleNumber.pending, (state) => {
        state.raffleState.loading = true;
      })
      .addCase(updateRaffleNumber.fulfilled, (state, action) => {
        state.raffleState.loading = false;
        state.raffleState.raffleReserved = action.payload.msg;
      });
  },
});

export const { clear } = raffleSlice.actions;

export const selectRaffles = (state) => state.raffle.raffleState;

export default raffleSlice.reducer;
