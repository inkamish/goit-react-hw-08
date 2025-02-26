import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./contacts/slice";
import filterReducer from "./filters/slice";
import authReducer from "./auth/slice";

import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["contacts", "filters", "auth"],
};

const rootReducer = combineReducers({
  contacts: contactsReducer,
  filters: filterReducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export const persistor = persistStore(store);
