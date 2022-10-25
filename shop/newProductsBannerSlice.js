import {
  createSlice,
  createAsyncThunk,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { getBannersApi } from '../../services/api/methods/newProducts';
import Toast from 'react-native-toast-message';
import { navigate } from '../../boot/rootNavigation';
export const fetchNewProductBanners = createAsyncThunk(
  'get/newProductBanners',
  async (payload) => {
    try {
      const response = await getBannersApi(payload);
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

const NewProductBanners = createSlice({
  name: 'newProductBanners',
  initialState: {
    bannerList: [],
    loading: false,
    error: '',
  },
  reducers: {
    clearBanners: (state, action) => {
      state.bannerList = [];
    },
  },
  extraReducers: {
    [fetchNewProductBanners.fulfilled]: (state, action) => {
      state.bannerList = action?.payload?.data;
      state.loading = false;
    },
    [fetchNewProductBanners.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchNewProductBanners.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },
  },
});

export const { clearBanners } = NewProductBanners.actions;
export default NewProductBanners.reducer;
