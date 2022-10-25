import {
  createSlice,
  createAsyncThunk,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {
  placeAnOrderApi,
  getMyOrderApi,
  getOrderDetailApi,
  getReceivedOrderApi,
} from '../../services/api/methods/orders';
import Toast from 'react-native-toast-message';
import { navigate } from '../../boot/rootNavigation';
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const postCreateOrder = createAsyncThunk(
  'post/orderCreate',
  async (payload) => {
    try {
      const response = await placeAnOrderApi(payload);
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

//get My Orders
export const getMyOrder = createAsyncThunk('get/MyOrder', async (payload) => {
  try {
    const response = await getMyOrderApi({ params: payload });
    const data = response?.data;
    return data;
  } catch (err) {
    if (err?.response?.data?.code == 401) {
      navigate('StoreCleaner');
    }
    throw err.message == 'Network Error' ? err?.message : err?.response?.data;
  }
});

//order Detail

export const getOrderDetail = createAsyncThunk(
  'get/OrderDetail',
  async (id) => {
    try {
      const response = await getOrderDetailApi(id);
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

//received orders
export const getReceivedOrder = createAsyncThunk(
  'get/ReceivedOrder',
  async (payload) => {
    try {
      const response = await getReceivedOrderApi({ params: payload });
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

const placeOrderSlice = createSlice({
  name: 'orderCreate',
  initialState: {
    loading: false,
    myOrders: [],
    receivedOrders: [],
    myOrdersPagination: [],
    receivedOrdersPagination: [],
    orderDetail: [],
    ordersLoading: false,
    error: '',
  },
  reducers: {
    clearMyOrders: (state, action) => {
      state.myOrders = [];
      state.myOrdersPagination = [];
      state.receivedOrders = [];
      state.receivedOrdersPagination = [];
      state.orderDetail = [];
    },
  },
  extraReducers: {
    //Create Order
    [postCreateOrder.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [postCreateOrder.pending]: (state, action) => {
      state.loading = true;
    },
    [postCreateOrder.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },

    //get My Orders
    [getMyOrder.fulfilled]: (state, action) => {
      state.ordersLoading = false;
      state.myOrdersPagination = action?.payload?.data?.paging;

      if (action?.meta?.arg?.page == 1) {
        state.myOrders = action?.payload?.data?.result;
      } else {
        state.myOrders = [...state.myOrders, ...action?.payload?.data?.result];
      }
    },
    [postCreateOrder.pending]: (state, action) => {
      state.ordersLoading = true;
    },
    [getMyOrder.rejected]: (state, action) => {
      state.ordersLoading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },

    //get Orders details
    [getOrderDetail.fulfilled]: (state, action) => {
      state.ordersLoading = false;
      state.orderDetail = action?.payload?.data;
    },
    [getOrderDetail.pending]: (state, action) => {
      state.ordersLoading = true;
    },
    [getOrderDetail.rejected]: (state, action) => {
      state.ordersLoading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },

    //get Received Orders
    [getReceivedOrder.fulfilled]: (state, action) => {
      state.ordersLoading = false;
      state.receivedOrdersPagination = action?.payload?.data?.paging;

      if (action?.meta?.arg?.page == 1) {
        state.receivedOrders = action?.payload?.data?.result;
      } else {
        state.receivedOrders = [
          ...state.receivedOrders,
          ...action?.payload?.data?.result,
        ];
      }
    },
    [getReceivedOrder.pending]: (state, action) => {
      state.ordersLoading = true;
    },
    [getReceivedOrder.rejected]: (state, action) => {
      state.ordersLoading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },
  },
});

export const { clearMyOrders } = placeOrderSlice.actions;
export default placeOrderSlice.reducer;
