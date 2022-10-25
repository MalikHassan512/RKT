import {
  createSlice,
  createAsyncThunk,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { addProductApi,uploadImageApi } from '../../services/api/methods/addProduct';
import Toast from 'react-native-toast-message';
import { navigate } from '../../boot/rootNavigation';
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const postAddProduct = createAsyncThunk(
  'post/addProduct',
  async (payload) => {
    try {
      const response = await addProductApi(payload);
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

export const postUploadImage = createAsyncThunk(
  'post/uploadImage',
  async (payload) => {
    try {
      const response = await uploadImageApi(payload);
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

const addProductSlice = createSlice({
  name: 'addProduct',
  initialState: {
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: {
    [postAddProduct.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [postAddProduct.pending]: (state, action) => {
      state.loading = true;
    },
    [postAddProduct.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },
    [postUploadImage.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [postUploadImage.pending]: (state, action) => {
      // state.loading = true;
    },
    [postUploadImage.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },
  },
});

export default addProductSlice.reducer;
