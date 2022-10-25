import {
  createSlice,
  createAsyncThunk,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {
  getMarketPlaceListApi,
  gettMarketPlaceListWithParamsApi,
} from '../../services/api/methods/shopMarketplaceList';
import Toast from 'react-native-toast-message';
import { navigate } from '../../boot/rootNavigation';
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const fetchMarketPlaceListWithParams = createAsyncThunk(
  'get/fetchMarketPlaceListViaParams',
  async (payload) => {
    try {
      const response = await gettMarketPlaceListWithParamsApi(payload);
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

export const fetchNewListWithParams = createAsyncThunk(
  'get/fetchNewListWithParams',
  async (payload) => {
    try {
      const response = await gettMarketPlaceListWithParamsApi(payload);
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

const marketplaceListSlice = createSlice({
  name: 'marketplace',
  initialState: {
    marketplaceShopList: [],
    loading: false,
    pagination: [],
    filterLoading: false,
    shopList: [],
    shopPagination: [],
    shopLoading: false,
    error: '',
  },
  reducers: {
    clearMarketplaceList: (state, action) => {
      state.marketplaceShopList = [];
      state.pagination = [];
      state.shopList = [];
      state.shopPagination = [];
    },
  },
  extraReducers: {
    [fetchMarketPlaceListWithParams.fulfilled]: (state, action) => {
      if (action?.meta?.arg?.params?.page == 1) {
        state.marketplaceShopList = action?.payload?.data?.result;
      } else {
        state.marketplaceShopList = [
          ...state.marketplaceShopList,
          ...action?.payload?.data?.result,
        ];
      }

      state.pagination = action?.payload?.data?.paginate;
      state.filterLoading = false;
    },
    [fetchMarketPlaceListWithParams.pending]: (state, action) => {
      state.filterLoading = true;
    },
    [fetchMarketPlaceListWithParams.rejected]: (state, action) => {
      state.filterLoading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });

      // state.error = action.error;
    },
    //shop data
    [fetchNewListWithParams.fulfilled]: (state, action) => {
      if (action?.meta?.arg?.params?.page == 1) {
        state.shopList = action?.payload?.data?.result;
      } else {
        state.shopList = [...state.shopList, ...action?.payload?.data?.result];
      }
      state.shopPagination = action?.payload?.data?.paginate;
      state.shopLoading = false;
      // Toast.show({
      //   type: 'success',
      //   text1: 'Dummy text showing on the Toast',
      //   text2:
      //     '23222',
      // });
    },
    [fetchNewListWithParams.pending]: (state, action) => {
      state.shopLoading = true;
    },
    [fetchNewListWithParams.rejected]: (state, action) => {
      state.shopLoading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },
  },
});

export const { clearMarketplaceList } = marketplaceListSlice.actions;
export default marketplaceListSlice.reducer;
