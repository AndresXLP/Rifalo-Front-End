import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RifaloAppApi } from '../../services/rifaloAppApi';

//* THUNKS
export const signUp = createAsyncThunk('user/signUp', (data) =>
  RifaloAppApi.signUp(data)
);
export const signIn = createAsyncThunk('user/signIn', (data) =>
  RifaloAppApi.signIn(data)
);

//* SLICE DEFINITION
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: JSON.parse(window.localStorage.getItem('user')) || null,
    signUpState: {
      loading: false,
      status: '',
      message: '',
    },
    signInState: {
      loading: false,
      status: '',
      message: '',
    },
  },
  reducers: {
    clear(state) {
      state.signUpState.message = '';
    },
    logout(state) {
      state.user = '';
      window.localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.signInState.loading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.signInState.loading = false;
        state.signInState.status = action.payload.status;
        if (action.payload.status === 'unregistered') {
          state.signInState.message = action.payload.msg;
          return;
        }
        if (action.payload.status === 'wrong') {
          state.signInState.message = action.payload.msg;
          return;
        }
        if (action.payload.status === 'logged') {
          state.signInState.message = action.payload.msg;
          window.localStorage.setItem(
            'user',
            JSON.stringify(action.payload.user)
          );
          window.localStorage.setItem(
            'token',
            JSON.stringify(action.payload.token)
          );
          state.user = action.payload.user;
          return;
        }
      })
      .addCase(signUp.pending, (state) => {
        state.signUpState.loading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
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

export const { clear, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectUserSignUp = (state) => state.user.signUpState;

export default userSlice.reducer;
