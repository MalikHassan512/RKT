import {
  createSlice,
  createAsyncThunk,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {
  getCartApi,
  removeCartApi,
  updateCartApi,
} from '../../services/api/methods/cart';
import Toast from 'react-native-toast-message';
import { navigate } from '../../boot/rootNavigation';
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const getCart = createAsyncThunk('get/cart', async (payload) => {
  try {
    const response = await getCartApi(payload);
    const data = response?.data;
    return data;
  } catch (err) {
    if (err?.response?.data?.code == 401) {
      navigate('StoreCleaner');
    }
    throw err.message == 'Network Error' ? err?.message : err?.response?.data;
  }
});

export const postRemoveCart = createAsyncThunk(
  'post/removeCart',
  async (payload) => {
    try {
      const response = await removeCartApi(payload);
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

export const updateCart = createAsyncThunk(
  'post/updateCart',
  async (payload) => {
    try {
      const response = await updateCartApi(payload.id, payload.body);
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

const getCartSlice = createSlice({
  name: 'getCart',
  initialState: {
    loading: false,
    cartData: [],
    error: '',
  },
  reducers: {
    clearCart: (state, action) => {
      state.cartData = [];
    },
  },
  extraReducers: {
    [getCart.fulfilled]: (state, action) => {
      state.cartData = action.payload;
      state.loading = false;
    },
    [getCart.pending]: (state, action) => {
      state.loading = true;
    },
    [getCart.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },
    [postRemoveCart.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [postRemoveCart.pending]: (state, action) => {
      state.loading = true;
    },
    [postRemoveCart.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },
    [updateCart.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [updateCart.pending]: (state, action) => {
      state.loading = true;
    },
    [updateCart.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },
  },
});

export const { clearCart } = getCartSlice.actions;
export default getCartSlice.reducer;
