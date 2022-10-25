import {
  createSlice,
  createAsyncThunk,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { getNotificationListApi } from '../../services/api/methods/notification';
import Toast from 'react-native-toast-message';
import { navigate } from '../../boot/rootNavigation';
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const getNotificationList = createAsyncThunk(
  'get/notificationList',
  async (payload) => {
    try {
      const response = await getNotificationListApi(payload);
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

const getNotificationListSlice = createSlice({
  name: 'getNotificationList',
  initialState: {
    loading: false,
    notificationList: [],
    error: '',
  },
  reducers: {
    clearNotification: (state, action) => {
      state.notificationList = [];
    },
  },
  extraReducers: {
    [getNotificationList.fulfilled]: (state, action) => {
      state.notificationList = action?.payload?.data;
      state.loading = false;
    },
    [getNotificationList.pending]: (state, action) => {
      state.loading = true;
    },
    [getNotificationList.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },
  },
});

export const { clearNotification } = getNotificationListSlice.actions;
export default getNotificationListSlice.reducer;
