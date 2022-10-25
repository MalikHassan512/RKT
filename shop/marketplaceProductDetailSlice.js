import {
  createSlice,
  createAsyncThunk,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { gettMarketPlaceProductDetailApi } from '../../services/api/methods/shopMarketplaceList';
import Toast from 'react-native-toast-message';
import { navigate } from '../../boot/rootNavigation';
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const fetchMarketPlaceProductDetail = createAsyncThunk(
  'get/fetchMarketPlaceProductDetail',
  async (payload) => {
    try {
      const response = await gettMarketPlaceProductDetailApi(payload);
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

const marketplaceProductDetailSlice = createSlice({
  name: 'productDetail',
  initialState: {
    marketPlaceProductDetail: [],
    loading: false,
    error: '',
  },
  reducers: {
    clearDetailData: (state, action) => {
      state.marketPlaceProductDetail = [];
    },
  },
  extraReducers: {
    [fetchMarketPlaceProductDetail.fulfilled]: (state, action) => {
      state.marketPlaceProductDetail = action.payload.data;
      state.loading = false;
    },
    [fetchMarketPlaceProductDetail.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchMarketPlaceProductDetail.rejected]: (state, action) => {
      state.shopLoading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },
  },
});

export const { clearDetailData } = marketplaceProductDetailSlice.actions;
export default marketplaceProductDetailSlice.reducer;
