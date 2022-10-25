import {
  createSlice,
  createAsyncThunk,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {
  updateProductImagesApi,
  updateProductVariantApi,
  updateProductGeneralDetailApi,
  updateProductApi,
} from '../../services/api/methods/addProduct';
import Toast from 'react-native-toast-message';
import { navigate } from '../../boot/rootNavigation';
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const updateProductImages = createAsyncThunk(
  'post/updateProductImages',
  async (body) => {
    try {
      const response = await updateProductImagesApi(body.id, body.payload);
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

export const updateProductVariant = createAsyncThunk(
  'post/updateProductVariant',
  async (body) => {
    try {
      const response = await updateProductVariantApi(body.id, body.payload);
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

export const updateProductApiFunc = createAsyncThunk(
  'post/updateProductApiFunc',
  async (body) => {
    try {
      const response = await updateProductApi(body.id, body.payload);
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

export const updateProductGeneralDetail = createAsyncThunk(
  'post/updateProductGeneralDetail',
  async (body) => {
    try {
      const response = await updateProductGeneralDetailApi(
        body.id,
        body.payload,
      );
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

const editProductSlice = createSlice({
  name: 'editProduct',
  initialState: {
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: {
    [updateProductImages.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [updateProductImages.pending]: (state, action) => {
      state.loading = true;
    },
    [updateProductImages.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },
    [updateProductVariant.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [updateProductVariant.pending]: (state, action) => {
      state.loading = true;
    },
    [updateProductVariant.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },
    [updateProductGeneralDetail.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [updateProductGeneralDetail.pending]: (state, action) => {
      state.loading = true;
    },
    [updateProductGeneralDetail.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },
    [updateProductApiFunc.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [updateProductApiFunc.pending]: (state, action) => {
      state.loading = true;
    },
    [updateProductApiFunc.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },
  },
});

export default editProductSlice.reducer;
