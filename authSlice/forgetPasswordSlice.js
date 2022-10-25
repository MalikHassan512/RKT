import {
  createSlice,
  createAsyncThunk,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {
  forgetPasswordUserApi,
  newPasswordUserApi,
  otpUserApi,
} from '../../services/api/methods/forgetPassword';
import Toast from 'react-native-toast-message';
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const postForgetPassword = createAsyncThunk(
  'post/forgot_password',
  async (payload) => {
    try {
      const response = await forgetPasswordUserApi(payload);
      const data = response?.data;
      return data;
    } catch (err) {
      throw err.message == 'Network Error' ? err?.message : err?.response?.data;
    }
  },
);

export const postNewPassword = createAsyncThunk(
  'post/reset-password',
  async (payload) => {
    try {
      const response = await newPasswordUserApi(payload);
      const data = response?.data;
      return data;
    } catch (err) {
      throw err.message == 'Network Error' ? err?.message : err?.response?.data;
    }
  },
);

export const postOtp = createAsyncThunk(
  'post/opt-validate',
  async (payload) => {
    try {
      const response = await otpUserApi(payload);
      const data = response?.data;
      return data;
    } catch (err) {
      throw err.message == 'Network Error' ? err?.message : err?.response?.data;
    }
  },
);

const forgetPasswordSlice = createSlice({
  name: 'forgetPassword',
  initialState: {
    userData: null,
    loading: false,
    error: '',
  },
  reducers: {
    resetData: (state, action) => {
      state.userData = null;
    },
  },
  extraReducers: {
    [postForgetPassword.fulfilled]: (state, action) => {
      state.userData = action.payload;
      state.loading = false;
    },
    [postForgetPassword.pending]: (state, action) => {
      state.loading = true;
    },
    [postForgetPassword.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },
    [postNewPassword.fulfilled]: (state, action) => {
      state.userData = action.payload;
      state.loading = false;
    },
    [postNewPassword.pending]: (state, action) => {
      state.loading = true;
    },
    [postNewPassword.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },
    [postOtp.fulfilled]: (state, action) => {
      state.userData = action.payload;
      state.loading = false;
    },
    [postOtp.pending]: (state, action) => {
      state.loading = true;
    },
    [postOtp.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },
  },
});

export const { resetData } = forgetPasswordSlice.actions;
export default forgetPasswordSlice.reducer;
