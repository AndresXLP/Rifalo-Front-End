import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RifaloAppApi } from '../../services/rifaloAppApi';

//* THUNKS
export const getAllRaffles = createAsyncThunk('raffle/getAllRaffles', () =>
  RifaloAppApi.getAllRaffles()
);
export const getMyRaffle = createAsyncThunk('raffle/getMyRaffle', (id) =>
  RifaloAppApi.getMyRaffle(id)
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
export const deleteRaffle = createAsyncThunk('raffle/deleteRaffle', (id) =>
  RifaloAppApi.deleteRaffle(id)
);

//* SLICE DEFINITION
const initialState = {
  loading: true,
  raffles: '',
  raffle: '',
  raffleReserved: '',
  idRaffle: '',
  status: '',
};
export const raffleSlice = createSlice({
  name: 'raffle',
  initialState: {
    raffleState: initialState,
  },
  reducers: {
    clear(state) {
      state.raffleState.raffleReserved = '';
    },
    clearStatus(state) {
      state.raffleState = initialState;
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
        state.raffleState.status = '';
      })
      .addCase(getAllRaffles.fulfilled, (state, action) => {
        state.raffleState.loading = false;
        state.raffleState.status = action.payload.status;
        state.raffleState.status === 'ok' &&
          (state.raffleState.raffles = action.payload.raffles);
      })
      .addCase(getMyRaffle.pending, (state) => {
        state.raffleState.loading = true;
        state.raffleState.status = '';
      })
      .addCase(getMyRaffle.fulfilled, (state, action) => {
        state.raffleState.loading = false;
        state.raffleState.status = action.payload.status;
        state.raffleState.status === 'ok' &&
          (state.raffleState.raffles = action.payload.raffles);
      })
      .addCase(getRaffleById.pending, (state) => {
        state.raffleState.loading = true;
        state.raffleState.status = '';
      })
      .addCase(getRaffleById.fulfilled, (state, action) => {
        state.raffleState.loading = false;
        state.raffleState.status = action.payload.status;
        state.raffleState.status === 'ok' &&
          (state.raffleState.raffle = action.payload.raffle);
      })
      .addCase(updateRaffleNumber.pending, (state) => {
        state.raffleState.loading = true;
      })
      .addCase(updateRaffleNumber.fulfilled, (state, action) => {
        state.raffleState.loading = false;
        state.raffleState.raffleReserved = action.payload.msg;
      })
      .addCase(deleteRaffle.pending, (state) => {
        state.raffleState.loading = true;
        state.raffleState.status = '';
      })
      .addCase(deleteRaffle.fulfilled, (state, action) => {
        state.raffleState.loading = false;
        state.raffleState.status = action.payload.status;
      });
  },
});

export const { clear, clearStatus } = raffleSlice.actions;

export const selectRaffles = (state) => state.raffle.raffleState;

export default raffleSlice.reducer;
