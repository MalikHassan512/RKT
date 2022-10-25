import {
  createSlice,
  createAsyncThunk,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { getUserStatsApi } from '../../services/api/methods/userStats';
import Toast from 'react-native-toast-message';
import { navigate } from '../../boot/rootNavigation';
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const fetchUserStats = createAsyncThunk(
  'get/userStats',
  async (payload) => {
    try {
      const response = await getUserStatsApi({ params: payload });
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

const userStatsSlice = createSlice({
  name: 'userStats',
  initialState: {
    userStatsData: [],
    loading: false,
    error: '',
  },
  reducers: {
    resetUserStats: (state, action) => {
      state.userStatsData = [];
    },
  },
  extraReducers: {
    [fetchUserStats.fulfilled]: (state, action) => {
      state.userStatsData = action?.payload?.data;
      state.loading = false;
    },
    [fetchUserStats.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchUserStats.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },
  },
});

export const { resetUserStats } = userStatsSlice.actions;
export default userStatsSlice.reducer;
