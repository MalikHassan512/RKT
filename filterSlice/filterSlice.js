import {
  createSlice,
  createAsyncThunk,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { getProductFiltersApi } from '../../services/api/methods/productFilters';
import Toast from 'react-native-toast-message';
import { navigate } from '../../boot/rootNavigation';
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const fetchProductFilters = createAsyncThunk(
  'get/fetchProductFilters',
  async () => {
    try {
      const response = await getProductFiltersApi();
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

export const fetchChips = createAsyncThunk('get/fetchChips', async (data) => {
  return data;
});

export const updateFilterData = createAsyncThunk(
  'update/updateFilterData',
  async (data) => {
    return data;
  },
);

const filterSlice = createSlice({
  name: 'onBoard',
  initialState: {
    productFiltersData: [],
    fixFiltersData: [],
    chipsData: [],
    productCollectData: [],
    productSizesData: [],
    loading: false,
    error: '',
  },
  reducers: {
    resetFilter: (state, action) => {
      state.chipsData = [];
      state.productFiltersData = state.fixFiltersData;
    },
  },
  extraReducers: {
    // chips data
    [fetchChips.fulfilled]: (state, action) => {
      state.chipsData = [...action.payload];
    },

    //updateFilterData
    [updateFilterData.fulfilled]: (state, action) => {
      state.productFiltersData = [...action.payload];
    },

    //main data
    [fetchProductFilters.fulfilled]: (state, action) => {
      state.productFiltersData = [...action.payload.data];
      state.fixFiltersData = [...action.payload.data];

      //handling Collection state
      action.payload.data.map((payloadData) => {
        if (payloadData.title === 'Collections') {
          state.productCollectData = payloadData;
        }
        if (payloadData.title === 'Sizes') {
          state.productSizesData = payloadData;
        }
        return true;
      });

      state.loading = false;
    },
    [fetchProductFilters.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchProductFilters.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },
  },
});

export const { resetFilter } = filterSlice.actions;
export default filterSlice.reducer;
