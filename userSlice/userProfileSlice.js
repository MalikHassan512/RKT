import {
  createSlice,
  createAsyncThunk,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { getUserProfileApi } from '../../services/api/methods/userStats';
import Toast from 'react-native-toast-message';
import { navigate } from '../../boot/rootNavigation';
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const getUserProfile = createAsyncThunk('get/userProfile', async () => {
  try {
    const response = await getUserProfileApi();
    const data = response.data;
    return data;
  } catch (err) {
    if (err?.response?.data?.code == 401) {
      navigate('StoreCleaner');
    }
    throw err.message == 'Network Error' ? err?.message : err?.response?.data;
  }
});

const userStatsSlice = createSlice({
  name: 'userProfile',
  initialState: {
    userProfileData: null,
    loading: false,
    error: '',
  },
  reducers: {
    resetUserProfile: (state, action) => {
      state.userProfileData = null;
    },
  },
  extraReducers: {
    [getUserProfile.fulfilled]: (state, action) => {
      state.userProfileData = action?.payload?.data;
      state.loading = false;
    },
    [getUserProfile.pending]: (state, action) => {
      state.loading = true;
    },
    [getUserProfile.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },
  },
});

export const { resetUserProfile } = userStatsSlice.actions;
export default userStatsSlice.reducer;
