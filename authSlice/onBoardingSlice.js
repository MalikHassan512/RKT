import {
  createSlice,
  createAsyncThunk,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { getOnBoardingContentApi } from '../../services/api/methods/onBoarding';
import Toast from 'react-native-toast-message';
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const fetchOnBoarding = createAsyncThunk(
  'get/fetchOnBoarding',
  async () => {
    try {
      const response = await getOnBoardingContentApi();
      const data = response.data;
      return data;
    } catch (err) {
      throw err.message == 'Network Error' ? err?.message : err?.response?.data;
    }
  },
);

const onBoardSlice = createSlice({
  name: 'onBoard',
  initialState: {
    onBoardData: null,
    firstTime: true,
    loading: false,
    error: '',
  },
  reducers: {
    changeFirstTime: (state, action) => {
      state.firstTime = false;
    },
    resetOnBoardData: (state, action) => {
      state.onBoardData = null;
    },
  },
  extraReducers: {
    [fetchOnBoarding.fulfilled]: (state, action) => {
      state.onBoardData = action.payload;
      state.loading = false;
    },
    [fetchOnBoarding.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchOnBoarding.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },
  },
});

export const { changeFirstTime, resetOnBoardData } = onBoardSlice.actions;
export default onBoardSlice.reducer;
