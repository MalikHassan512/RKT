import {
  createSlice,
  createAsyncThunk,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {
  addOutfitApi,
  searchBrandsApi,
} from '../../services/api/methods/outfit';
import Toast from 'react-native-toast-message';
import { navigate } from '../../boot/rootNavigation';
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const getBrandNames = createAsyncThunk(
  'get/brandNames',
  async (payload) => {
    try {
      const response = await searchBrandsApi(payload);
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

const searchBrandSlice = createSlice({
  name: 'addOutfit',
  initialState: {
    loading: false,
    error: '',
    brandNames: [],
  },
  reducers: {
    clearBrandNames: (state, action) => {
      state.brandNames = [];
    },
  },
  extraReducers: {
    [getBrandNames.fulfilled]: (state, action) => {
      state.loading = false;
      state.brandNames = action?.payload?.data;
    },
    [getBrandNames.pending]: (state, action) => {
      state.loading = true;
    },
    [getBrandNames.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },
  },
});
export const { clearBrandNames } = searchBrandSlice.actions;
export default searchBrandSlice.reducer;
