import { createSlice } from '@reduxjs/toolkit';

const netInfoSlice = createSlice({
  name: 'netInfo',
  initialState: {
    connected: null,
  },
  reducers: {
    updateNetConnection: (state, action) => {
      state.connected = action?.payload?.isConnected;
    },
  },
});

export const { updateNetConnection } = netInfoSlice.actions;
export default netInfoSlice.reducer;
