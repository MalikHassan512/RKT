import {
  createSlice,
  createAsyncThunk,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {
  registerUserApi,
  validUserApi,
  validEmailApi,
  storeFcmApi,
} from '../../services/api/methods/register';
import Toast from 'react-native-toast-message';
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const postRegister = createAsyncThunk(
  'post/register',
  async (payload) => {
    try {
      const response = await registerUserApi(payload);
      const data = response?.data;
      return data;
    } catch (err) {
      throw err.message == 'Network Error' ? err?.message : err?.response?.data;
    }
  },
);

export const postValidUserName = createAsyncThunk(
  'post/validUserName',
  async (payload) => {
    try {
      const response = await validUserApi(payload);
      const data = response?.data;
      return data;
    } catch (err) {
      throw err.message == 'Network Error' ? err?.message : err?.response?.data;
    }
  },
);

export const postValidEmail = createAsyncThunk(
  'post/validEmail',
  async (payload) => {
    try {
      const response = await validEmailApi(payload);
      const data = response?.data;
      return data;
    } catch (err) {
      throw err.message == 'Network Error' ? err?.message : err?.response?.data;
    }
  },
);

export const storeFCM = createAsyncThunk('post/storeFCM', async (payload) => {
  try {
    const response = await storeFcmApi(payload);
    const data = response?.data;
    return data;
  } catch (err) {
    throw err.message == 'Network Error' ? err?.message : err?.response?.data;
  }
});

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    userData: null,
    // userValid: null,
    loading: false,
    error: '',
  },
  reducers: {
    postValidUserName(state, action) {
      state.userValid = action.payload;
    },
    logOut: (state, action) => {
      state.userData = null;
    },
  },
  extraReducers: {
    [postRegister.fulfilled]: (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    },
    [postRegister.pending]: (state, action) => {
      state.loading = true;
    },
    [postRegister.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },
  },
});

export const { logOut } = registerSlice.actions;
export default registerSlice.reducer;
