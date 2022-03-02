import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RifaloAppApi } from '../../services/rifaloAppApi';

//* THUNKS
export const signUp = createAsyncThunk('user/signUp', (data) =>
  RifaloAppApi.signUp(data)
);
export const signIn = createAsyncThunk('user/signIn', (data) =>
  RifaloAppApi.loginUser(data)
);

//* SLICE DEFINITION
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    signUpState: {
      loading: false,
      status: '',
      message: '',
    },
  },
  reducers: {
    clear(state) {
      state.signUpState.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.signUpState.loading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        console.log(action.payload);
        state.signUpState.loading = false;
        if (action.payload.msg === 'Success') {
          state.signUpState.message = 'Usuario Registrado Exitosamente';
          state.signUpState.status = action.payload.msg;
        }
        action.payload.msg === 'Already Exist' &&
          (state.signUpState.message = 'El Usuario ya se encuentra Registrado');
      })
      .addCase(signUp.rejected, (state) => {});
  },
});

export const { clear } = userSlice.actions;

export const selectUser = (state) => state.user.signUpState;

export default userSlice.reducer;
