// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default storage for local storage
import authReducer from './inputSlice'; // Import your existing authReducer

// Create a persist config for Redux Persist
const persistConfig = {
  key: 'root',
  storage, // Use localStorage by default
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, authReducer);

// Configure the store with the persisted reducer
const store = configureStore({
  reducer: {
    auth: persistedReducer, // Use the persisted reducer here
  },
});

// Create a persistor for Redux Persist
export const persistor = persistStore(store);

export default store;
