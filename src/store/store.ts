// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import todosReducer from './reducers/todosReducer'

const rootReducer = combineReducers({
  todos : todosReducer
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['todos'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof rootReducer>;

export const persistor = persistStore(store);
