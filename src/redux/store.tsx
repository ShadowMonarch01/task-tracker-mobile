import Asyncstorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

import tasksReducer from "./slices/tasksSlice";

const root = combineReducers({
  tasks: tasksReducer,
});

const persistConfig = {
  key: "root",
  storage: Asyncstorage,
  whitelist: ["tasks"],
  version: 1,
};

const persisted = persistReducer(persistConfig, root);

export const store = configureStore({
  reducer: persisted,
  middleware: g =>
    g({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
