import {
  createSlice,
  createAsyncThunk,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { getWardrobeProductListApi } from '../../services/api/methods/wardrobeProductList';
import Toast from 'react-native-toast-message';
import { navigate } from '../../boot/rootNavigation';
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const fetchWardrobeProductList = createAsyncThunk(
  'get/fetchWardrobeProductList',
  async (payload) => {
    try {
      const response = await getWardrobeProductListApi(payload);
      const data = response.data;
      return data;
    } catch (err) {
      if (err?.response?.data?.code == 401) {
        navigate('StoreCleaner');
      }
      throw err.message == 'Network Error' ? err?.message : err?.response?.data;
    }
  },
);

const wardrobeProductListSlice = createSlice({
  name: 'wardrobe',
  initialState: {
    wardrobeProductList: [],
    loading: false,
    error: '',
  },
  reducers: {
    clearProductList: (state, action) => {
      state.wardrobeProductList = [];
    },
  },
  extraReducers: {
    [fetchWardrobeProductList.fulfilled]: (state, action) => {
      state.wardrobeProductList = action.payload.data;
      state.loading = false;
    },
    [fetchWardrobeProductList.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchWardrobeProductList.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },
  },
});

export const { clearProductList } = wardrobeProductListSlice.actions;
export default wardrobeProductListSlice.reducer;
