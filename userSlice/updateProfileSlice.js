import {
  createSlice,
  createAsyncThunk,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {
  updateUserProfile,
  removeUserProfileImage,
  deActivateUserProfile,
} from '../../services/api/methods/userStats';
import Toast from 'react-native-toast-message';
import { navigate } from '../../boot/rootNavigation';
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const postUpdateProfile = createAsyncThunk(
  'post/updateProfile',
  async (payload) => {
    try {
      const response = await updateUserProfile(payload);
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

export const postRemoveProfile = createAsyncThunk(
  'post/removeProfile',
  async () => {
    try {
      const response = await removeUserProfileImage();
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

export const postDeActivateProfile = createAsyncThunk(
  'post/deActivateProfile',
  async () => {
    try {
      const response = await deActivateUserProfile();
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

const updateProfileSlice = createSlice({
  name: 'updateProfile',
  initialState: {
    loading: false,
    userData: [],
    error: '',
  },
  reducers: {
    resetUserData: (state, action) => {
      state.userData = [];
    },
  },
  extraReducers: {
    [postUpdateProfile.fulfilled]: (state, action) => {
      state.loading = false;
      state.userData = action.payload;
      if (
        action.meta.arg._parts[0][0] == 'allow_search' ||
        action.meta.arg._parts[0][0] == 'allow_mention'
      ) {
        Toast.show({
          type: 'success',
          text1: 'preferences updated successfully.',
        });
      } else {
        Toast.show({
          type: 'success',
          text1: action?.payload?.message,
        });
      }
    },
    [postUpdateProfile.pending]: (state, action) => {
      state.loading = true;
    },
    [postUpdateProfile.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },
    [postRemoveProfile.fulfilled]: (state, action) => {
      state.loading = false;
      // Toast.show({
      //   type: 'success',
      //   text1: action?.payload?.message,
      // });
    },
    [postRemoveProfile.pending]: (state, action) => {
      state.loading = true;
    },
    [postRemoveProfile.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },
    [postDeActivateProfile.fulfilled]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'success',
        text1: action?.payload?.message,
      });
    },
    [postDeActivateProfile.pending]: (state, action) => {
      state.loading = true;
    },
    [postDeActivateProfile.rejected]: (state, action) => {
      state.loading = false;
      Toast.show({
        type: 'error',
        text1: 'Warning',
        text2: action?.error?.message,
      });
    },
  },
});

export const { resetUserData } = updateProfileSlice.actions;
export default updateProfileSlice.reducer;
