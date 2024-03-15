import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './auth-reducer'
import persistStore from 'redux-persist/es/persistStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import persistReducer from 'redux-persist/es/persistReducer';
import _eventReducer from './eventReducer';
const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
};
const rootReducer = combineReducers({
  createEvent: _eventReducer,

});
const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: {
    authReducer: authReducer,
    eventReducer: persistedReducer,

  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'], // Exclure les actions de Redux Persist
    },
    immutableCheck: false, 
    serializableCheck: false,
  }),
})
export let persistor = persistStore(store);