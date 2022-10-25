import {
  createSlice,
  createAsyncThunk,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { getCheckOutApi } from '../../services/api/methods/cart';
import Toast from 'react-native-toast-message';
import { navigate } from '../../boot/rootNavigation';
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const getCheckOut = createAsyncThunk('get/CheckOut', async (payload) => {
  try {
    const response = await getCheckOutApi(payload.id, payload.body);
    const data = response?.data;
    return data;
  } catch (err) {
    if (err?.response?.data?.code == 401) {
      navigate('StoreCleaner');
    }
    throw err.message == 'Network Error' ? err?.message : err?.response?.data;
  }
});

const checkOutSlice = createSlice({
  name: 'checkOut',
  initialState: {
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: {
    [getCheckOut.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [getCheckOut.pending]: (state, action) => {
      state.loading = true;
    },
    [getCheckOut.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },
  },
});

export default checkOutSlice.reducer;
