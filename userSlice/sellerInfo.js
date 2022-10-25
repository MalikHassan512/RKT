import {
  createSlice,
  createAsyncThunk,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {
  getSellerInfoApi,
  updateSellerInfoApi,
} from '../../services/api/methods/sellerInfo';
import Toast from 'react-native-toast-message';
import { navigate } from '../../boot/rootNavigation';
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const getSellerInfo = createAsyncThunk(
  'get/sellerInfo',
  async (payload) => {
    try {
      const response = await getSellerInfoApi(payload);
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

export const updateSellerInfo = createAsyncThunk(
  'post/sellerInfo',
  async (payload) => {
    try {
      const response = await updateSellerInfoApi(payload);
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

const sellerInfoSlice = createSlice({
  name: 'sellerInfo',
  initialState: {
    loading: false,
    sellerData: [],
    error: '',
  },
  reducers: {
    clearSellerInfo: (state, action) => {
      state.sellerData = [];
    },
  },
  extraReducers: {
    [getSellerInfo.fulfilled]: (state, action) => {
      state.loading = false;
      state.sellerData = action?.payload?.data;
    },
    [getSellerInfo.pending]: (state, action) => {
      state.loading = true;
    },
    [getSellerInfo.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },

    //update
    [updateSellerInfo.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [updateSellerInfo.pending]: (state, action) => {
      state.loading = true;
    },
    [updateSellerInfo.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },
  },
});

export const { clearSellerInfo } = sellerInfoSlice.actions;
export default sellerInfoSlice.reducer;
