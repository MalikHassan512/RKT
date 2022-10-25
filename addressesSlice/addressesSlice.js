import {
  createSlice,
  createAsyncThunk,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {
  addAddressApi,
  getAddressApi,
  deleteAddressApi,
  updateAddressApi,
  getDefaultAddressApi,
} from '../../services/api/methods/addresses';
import Toast from 'react-native-toast-message';
import { navigate } from '../../boot/rootNavigation';
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});
//add
export const postAddAddress = createAsyncThunk(
  'post/addAddress',
  async (payload) => {
    try {
      const response = await addAddressApi(payload);
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
//update
export const updateAddress = createAsyncThunk(
  'post/updateAddress',
  async (payload) => {
    try {
      const response = await updateAddressApi(payload?.id, payload?.formData);
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

//get
export const getAddress = createAsyncThunk('get/address', async (payload) => {
  try {
    const response = await getAddressApi({ params: payload });
    const data = response?.data;
    return data;
  } catch (err) {
    if (err?.response?.data?.code == 401) {
      navigate('StoreCleaner');
    }
    throw err.message == 'Network Error' ? err?.message : err?.response?.data;
  }
});

//get default
export const getDefaultAddress = createAsyncThunk(
  'get/defaultAddress',
  async (payload) => {
    try {
      const response = await getDefaultAddressApi();
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

//delete
export const deleteAddress = createAsyncThunk(
  'get/deleteAddress',
  async (id) => {
    try {
      const response = await deleteAddressApi(id);
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

const addAddressSlice = createSlice({
  name: 'addresses',
  initialState: {
    loading: false,
    addressData: [],
    billingAddressData: [],
    defaultAddressData: [],
    error: '',
  },
  reducers: {
    resetAddress: (state, action) => {
      state.addressData = [];
      state.billingAddressData = [];
      state.defaultAddressData = [];
    },
  },
  extraReducers: {
    //Add
    [postAddAddress.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [postAddAddress.pending]: (state, action) => {
      state.loading = true;
    },
    [postAddAddress.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },
    //update
    [updateAddress.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [updateAddress.pending]: (state, action) => {
      state.loading = true;
    },
    [updateAddress.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },

    //get addressData
    [getAddress.fulfilled]: (state, action) => {
      if (action?.meta?.arg?.type == 'delivery') {
        state.addressData = action?.payload?.data;
      } else {
        state.billingAddressData = action?.payload?.data;
      }
      state.loading = false;
    },
    [getAddress.pending]: (state, action) => {
      state.loading = true;
    },
    [getAddress.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },

    //get default addressData
    [getDefaultAddress.fulfilled]: (state, action) => {
      state.defaultAddressData = action?.payload?.data;
      state.loading = false;
    },
    [getDefaultAddress.pending]: (state, action) => {
      state.loading = true;
    },
    [getDefaultAddress.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },

    //delete address
    [deleteAddress.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [deleteAddress.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteAddress.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },
  },
});

export const { resetAddress } = addAddressSlice.actions;

export default addAddressSlice.reducer;
