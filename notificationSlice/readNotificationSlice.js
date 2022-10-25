import {
  createSlice,
  createAsyncThunk,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { readNotificationApi } from '../../services/api/methods/notification';
import Toast from 'react-native-toast-message';
import { navigate } from '../../boot/rootNavigation';
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const readNotification = createAsyncThunk(
  'post/readNotification',
  async (id) => {
    try {
      const response = await readNotificationApi(id);
      const data = response?.data;
      return data;
    } catch (err) {
      if (err?.response?.data?.code == 401) {
        navigate('StoreCleaner');
      }
      throw err.message == 'Network Error' ? err?.message : err?.response?.data;
    }
  },
);

const readNotificationSlice = createSlice({
  name: 'readNotification',
  initialState: {
    loading: false,
    error: '',
  },
  extraReducers: {
    [readNotification.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [readNotification.pending]: (state, action) => {
      state.loading = true;
    },
    [readNotification.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },
  },
});

export default readNotificationSlice.reducer;
