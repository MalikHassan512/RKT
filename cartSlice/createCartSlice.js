import {
  createSlice,
  createAsyncThunk,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { createCartApi } from '../../services/api/methods/cart';
import Toast from 'react-native-toast-message';
import { navigate } from '../../boot/rootNavigation';
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const postCreateCart = createAsyncThunk(
  'post/createCart',
  async (payload) => {
    try {
      const response = await createCartApi(payload);
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

const createCartSlice = createSlice({
  name: 'createCart',
  initialState: {
    loading: false,
    cartData: null,
    error: '',
  },
  reducers: {
    clearCartData: (state, action) => {
      state.cartData = null;
    },
  },
  extraReducers: {
    [postCreateCart.fulfilled]: (state, action) => {
      state.cartData = action.payload;
      state.loading = false;
    },
    [postCreateCart.pending]: (state, action) => {
      state.loading = true;
    },
    [postCreateCart.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },
  },
});

export const { clearCartData } = createCartSlice.actions;
export default createCartSlice.reducer;
