import {
    createSlice,
    createAsyncThunk,
    getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { getOutfitsWardrobeListApi } from '../../services/api/methods/outfitsWardrobeList';
import Toast from 'react-native-toast-message';
import { navigate } from '../../boot/rootNavigation';
const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false,
});

export const fetchOutfitsWardrobeList = createAsyncThunk(
    'get/fetchOutfitsWardrobeList',
    async (payload) => {
        try {
            const response = await getOutfitsWardrobeListApi(payload);
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

const outfitsWardrobeListSlice = createSlice({
    name: 'outfits',
    initialState: {
        outfitsWardrobeList: [],
        loading: false,
        error: '',
    },
    reducers: {
        clearProductList: (state, action) => {
            state.outfitsWardrobeList = [];
        },
    },
    extraReducers: {
        [fetchOutfitsWardrobeList.fulfilled]: (state, action) => {
            state.outfitsWardrobeList = action.payload.data;
            state.loading = false;
        },
        [fetchOutfitsWardrobeList.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchOutfitsWardrobeList.rejected]: (state, action) => {
            state.loading = false;
            Toast.show({
                type: 'error',
                text1: 'Warning',
                text2: action?.error?.message,
            });
        },
    },
});

export const { clearProductList } = outfitsWardrobeListSlice.actions;
export default outfitsWardrobeListSlice.reducer;
