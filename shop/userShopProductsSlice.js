import {
  createSlice,
  createAsyncThunk,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { getUserShopProductsApi } from '../../services/api/methods/userShopProducts';
import Toast from 'react-native-toast-message';
import { navigate } from '../../boot/rootNavigation';
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const fetchUserShopProducts = createAsyncThunk(
  'get/userShopProducts',
  async (payload) => {
    try {
      const response = await getUserShopProductsApi({ params: payload });
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

const userShopProductsSlice = createSlice({
  name: 'userShopProducts',
  initialState: {
    userShopProductsData: [],
    pagination: [],
    loading: false,
    error: '',
  },
  reducers: {
    resetUserShopProducts: (state, action) => {
      state.userShopProductsData = [];
      state.pagination = [];
    },
  },
  extraReducers: {
    [fetchUserShopProducts.fulfilled]: (state, action) => {
      if (action?.meta?.arg?.page == 1) {
        state.userShopProductsData = action?.payload?.data?.result;
      } else {
        state.userShopProductsData = [
          ...state.userShopProductsData,
          ...action?.payload?.data?.result,
        ];
      }
      state.pagination = action?.payload?.data?.paginate;
      state.loading = false;
    },
    [fetchUserShopProducts.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchUserShopProducts.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },
  },
});

export const { resetUserShopProducts } = userShopProductsSlice.actions;
export default userShopProductsSlice.reducer;
