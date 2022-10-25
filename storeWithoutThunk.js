import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import AsyncStorage from "@react-native-community/async-storage";
import stepGoalSlice from "./StepGoals";
import { combineReducers, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import giftBoxSlice from "./giftBoxes";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["user", "steps", "giftBox"],
};

const rootReducer = combineReducers({
  user: UserSlice,
  steps: stepGoalSlice,
  giftBox: giftBoxSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: {
//     user: UserSlice,
//   },
// });

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
