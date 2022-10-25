import {
  createSlice,
  createAsyncThunk,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {
  getOffersApi,
  getRecievedOffersApi,
  acceptOrDeclineOfferApi,
} from '../../services/api/methods/offers';
import Toast from 'react-native-toast-message';
import { navigate } from '../../boot/rootNavigation';
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const getMyOffers = createAsyncThunk(
  'get/getOffersApi',
  async (payload) => {
    try {
      const response = await getOffersApi(payload);
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

export const getRecievedOffers = createAsyncThunk(
  'get/recievedOffersApi',
  async (payload) => {
    try {
      const response = await getRecievedOffersApi(payload);
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
export const acceptOrDeclineOffer = createAsyncThunk(
  'post/acceptOrDeclineOfferApi',
  async (payload) => {
    try {
      const response = await acceptOrDeclineOfferApi(payload.id, payload.body);
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

const offerSlice = createSlice({
  name: 'offers',
  initialState: {
    loading: false,
    offerData: [],
    recievedOfferData: [],
    error: '',
  },
  reducers: {
    clearOffersList: (state, action) => {
      state.offerData = [];
      state.recievedOfferData = [];
    },
  },
  extraReducers: {
    [getMyOffers.fulfilled]: (state, action) => {
      state.offerData = action?.payload?.data?.data;
      state.loading = false;
    },
    [getMyOffers.pending]: (state, action) => {
      state.loading = true;
    },
    [getMyOffers.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },
    [getRecievedOffers.fulfilled]: (state, action) => {
      state.recievedOfferData = action?.payload?.data?.data;
      state.loading = false;
    },
    [getRecievedOffers.pending]: (state, action) => {
      state.loading = true;
    },
    [getRecievedOffers.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },
    [acceptOrDeclineOffer.fulfilled]: (state, action) => {
      state.recievedOfferData = action?.payload?.data?.data;
      state.loading = false;
    },
    [acceptOrDeclineOffer.pending]: (state, action) => {
      state.loading = true;
    },
    [acceptOrDeclineOffer.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },
  },
});

export const { clearOffersList } = offerSlice.actions;
export default offerSlice.reducer;
