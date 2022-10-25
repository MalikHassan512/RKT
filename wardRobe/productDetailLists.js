import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  getProductTypesApi,
  getCategoriesApi,
  getSizeChartImageApi,
  getCategoriesViaProductTypeApi,
  getColorsApi
} from '../../services/api/methods/productDetailList';
import Toast from 'react-native-toast-message';
import { navigate } from '../../boot/rootNavigation';
export const getProductTypes = createAsyncThunk(
  'get/productTypes',
  async (payload) => {
    try {
      const response = await getProductTypesApi(payload);
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

export const getCategories = createAsyncThunk('get/categories', async () => {
  try {
    const response = await getCategoriesApi();
    const data = response?.data;
    return data;
  } catch (err) {
    if (err?.response?.data?.code == 401) {
      navigate('StoreCleaner');
    }
    throw err.message == 'Network Error' ? err?.message : err?.response?.data;
  }
});

export const getCategoriesViaProductType = createAsyncThunk(
  'get/categoriesViaProductType',
  async (payload) => {
    try {
      const response = await getCategoriesViaProductTypeApi(payload);
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

export const getSizeChartImage = createAsyncThunk(
  'get/sizeChartImage',
  async (payload) => {
    try {
      const response = await getSizeChartImageApi({ params: payload });
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

export const getColors = createAsyncThunk(
  'get/colors',
  async (payload) => {
    try {
      const response = await getColorsApi();
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

const productDetailListSlice = createSlice({
  name: 'addProduct',
  initialState: {
    productTypes: [],
    categories: [],
    colors: [],
    loading: false,
    error: '',
  },
  reducers: {
    clearProductTypes: (state, action) => {
      state.productTypes = [];
    },
  },
  extraReducers: {
    [getProductTypes.fulfilled]: (state, action) => {
      state.productTypes = [...action.payload.data];
      state.loading = false;
    },
    [getProductTypes.pending]: (state, action) => {
      state.loading = true;
    },
    [getProductTypes.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },
    [getCategories.fulfilled]: (state, action) => {
      state.categories = [...action.payload.data.categories];
      state.loading = false;
    },
    [getCategories.pending]: (state, action) => {
      state.loading = true;
    },
    [getCategories.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },
    [getCategoriesViaProductType.fulfilled]: (state, action) => {
      state.categories = [...action.payload.data.categories];
      state.loading = false;
    },
    [getCategoriesViaProductType.pending]: (state, action) => {
      state.loading = true;
    },
    [getCategoriesViaProductType.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },
    [getSizeChartImage.fulfilled]: (state, action) => {
      // state.categories = [...action.payload.data.categories]
      state.loading = false;
    },
    [getSizeChartImage.pending]: (state, action) => {
      state.loading = true;
    },
    [getSizeChartImage.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },
    [getColors.fulfilled]: (state, action) => {
      state.colors = [...action?.payload?.data]
      state.loading = false;
    },
    [getColors.pending]: (state, action) => {
      state.loading = true;
    },
    [getColors.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },
  },
});

export const { clearProductTypes } = productDetailListSlice.actions;
export default productDetailListSlice.reducer;
