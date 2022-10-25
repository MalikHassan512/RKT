import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logInUserApi, socialLoginApi } from "../../services/api/methods/logIn";
import Toast from "react-native-toast-message";

export const postLogIn = createAsyncThunk("post/logIn", async (payload) => {
  try {
    const response = await logInUserApi(payload);
    const data = response?.data;
    return data;
  } catch (err) {
    throw err.message == "Network Error" ? err?.message : err?.response?.data;
  }
});

const logInSlice = createSlice({
  name: "logIn",
  initialState: {
    userData: null,
    loading: false,
    error: "",
  },
  reducers: {
    reset: (state, action) => {
      state.userData = null;
    },
  },
  extraReducers: {
    [postLogIn.fulfilled]: (state, action) => {
      state.userData = action.payload;
      state.loading = false;
    },
    [postLogIn.pending]: (state, action) => {
      state.loading = true;
    },
    [postLogIn.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: "error",
        text1: "Warning",
        text2: action?.error?.message,
      });
    },
    [postSocialLogIn.fulfilled]: (state, action) => {
      state.userData = action.payload;
      state.loading = false;
    },
    [postSocialLogIn.pending]: (state, action) => {
      state.loading = true;
    },
    [postSocialLogIn.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: "error",
        text1: "Warning",
        text2: action?.error?.message,
      });
    },
  },
});

export const { reset } = logInSlice.actions;
export default logInSlice.reducer;
