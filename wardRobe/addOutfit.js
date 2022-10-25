import {
  createSlice,
  createAsyncThunk,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {
  addOutfitApi,
  upadateOutfitTagsApi,
} from '../../services/api/methods/outfit';
import Toast from 'react-native-toast-message';
import { navigate } from '../../boot/rootNavigation';
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const postAddOutFit = createAsyncThunk(
  'post/addOutfit',
  async (payload) => {
    try {
      const response = await addOutfitApi(payload);
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

export const postUpdateOutFitTags = createAsyncThunk(
  'post/updateOutfit',
  async (payload) => {
    try {
      const response = await upadateOutfitTagsApi(payload.id, payload.data);
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

const addOutfitSlice = createSlice({
  name: 'addOutfit',
  initialState: {
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: {
    // add outfit
    [postAddOutFit.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [postAddOutFit.pending]: (state, action) => {
      state.loading = true;
    },
    [postAddOutFit.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },
    //update outfit
    [postUpdateOutFitTags.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [postUpdateOutFitTags.pending]: (state, action) => {
      state.loading = true;
    },
    [postUpdateOutFitTags.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },
  },
});

export default addOutfitSlice.reducer;
