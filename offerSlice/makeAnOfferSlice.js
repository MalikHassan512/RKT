import {
  createSlice,
  createAsyncThunk,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { makeAnOfferApi } from '../../services/api/methods/offers';
import Toast from 'react-native-toast-message';
import { navigate } from '../../boot/rootNavigation';
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const postMakeAnOffer = createAsyncThunk(
  'post/makeAnOffer',
  async (payload) => {
    try {
      const response = await makeAnOfferApi(payload);
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

const makeAnOfferSlice = createSlice({
  name: 'makeOffer',
  initialState: {
    loading: false,
    offerData: null,
    error: '',
  },
  reducers: {
    resetOfferData: (state, action) => {
      state.offerData = null;
    },
  },
  extraReducers: {
    [postMakeAnOffer.fulfilled]: (state, action) => {
      state.offerData = action.payload;
      state.loading = false;
    },
    [postMakeAnOffer.pending]: (state, action) => {
      state.loading = true;
    },
    [postMakeAnOffer.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },
  },
});

export const { resetOfferData } = makeAnOfferSlice.actions;
export default makeAnOfferSlice.reducer;
