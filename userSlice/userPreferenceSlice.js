import {
  createSlice,
  createAsyncThunk,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {
  getSubscriptionApi,
  getNotificationApi,
  postPreferenceApi,
} from '../../services/api/methods/userPreferences';
import Toast from 'react-native-toast-message';
import { navigate } from '../../boot/rootNavigation';
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});
//subscription
export const fetchSubscriptions = createAsyncThunk(
  'get/fetchSubscriptions',
  async () => {
    try {
      const response = await getSubscriptionApi();
      const data = response.data;
      return data;
    } catch (err) {
      if (err?.response?.data?.code == 401) {
        navigate('StoreCleaner');
      }
      throw err.message == 'Network Error' ? err?.message : err?.response?.data;
    }
  },
);
//notifications
export const fetchNotifications = createAsyncThunk(
  'get/fetchNotifications',
  async (payload) => {
    try {
      const response = await getNotificationApi();
      const data = response.data;
      return data;
    } catch (err) {
      if (err?.response?.data?.code == 401) {
        navigate('StoreCleaner');
      }
      throw err.message == 'Network Error' ? err?.message : err?.response?.data;
    }
  },
);

//update Preferences
export const updatePreferences = createAsyncThunk(
  'get/updatePreferences',
  async (payload) => {
    try {
      const response = await postPreferenceApi(payload.id, payload.body);
      const data = response.data;
      return data;
    } catch (err) {
      if (err?.response?.data?.code == 401) {
        navigate('StoreCleaner');
      }
      throw err.message == 'Network Error' ? err?.message : err?.response?.data;
    }
  },
);

const userPreferenceSlice = createSlice({
  name: 'userPreference',
  initialState: {
    subscriptionData: null,
    notificationData: null,
    loading: false,
    error: '',
  },
  reducers: {
    resetPreference: (state, action) => {
      state.notificationData = null;
      state.subscriptionData = null;
    },
  },
  extraReducers: {
    //subscription
    [fetchSubscriptions.fulfilled]: (state, action) => {
      state.subscriptionData = action?.payload?.data;
      state.loading = false;
    },
    [fetchSubscriptions.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchSubscriptions.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },

    //Notification
    [fetchNotifications.fulfilled]: (state, action) => {
      state.notificationData = action?.payload?.data;
      state.loading = false;
    },
    [fetchNotifications.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchNotifications.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },

    //update Preferences
    [updatePreferences.fulfilled]: (state, action) => {
      Toast.show({
        type: 'success',
        text1: action?.payload?.message,
      });
      state.loading = false;
    },
    [updatePreferences.pending]: (state, action) => {
      state.loading = true;
    },
    [updatePreferences.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },
  },
});

export const { resetPreference } = userPreferenceSlice.actions;
export default userPreferenceSlice.reducer;
