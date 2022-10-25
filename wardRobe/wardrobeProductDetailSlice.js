import {
  createSlice,
  createAsyncThunk,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { getWardrobeProductDetailApi } from '../../services/api/methods/wardrobeProductDetail';
import Toast from 'react-native-toast-message';
import { navigate } from '../../boot/rootNavigation';
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const fetchWardrobeProductDetail = createAsyncThunk(
  'get/fetchWardrobeProductDetail',
  async (payload) => {
    try {
      const response = await getWardrobeProductDetailApi(payload);
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

const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState: {
    productDetailData: [],
    loading: false,
    error: '',
  },
  reducers: {
    resetWardrobeDetails: (state, action) => {
      state.productDetailData = [];
    },
  },
  extraReducers: {
    [fetchWardrobeProductDetail.fulfilled]: (state, action) => {
      state.productDetailData = action.payload.data;
      state.loading = false;
    },
    [fetchWardrobeProductDetail.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchWardrobeProductDetail.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },
  },
});

export const { resetWardrobeDetails } = productDetailSlice.actions;
export default productDetailSlice.reducer;
