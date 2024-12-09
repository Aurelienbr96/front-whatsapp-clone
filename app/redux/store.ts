import {configureStore, createListenerMiddleware} from '@reduxjs/toolkit';
import {userApi} from '../api/user/userApi';
import {authApi} from '../api/auth/authApi';

import {listeners} from './listeners';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import {userSlice} from './store/user.store';

import {rootReducer} from './rootReducer';
import {authMiddleware} from './middleware/auth.middleware';

export const listenerMiddleware = createListenerMiddleware();

listeners.forEach(listener => listener(listenerMiddleware));

export const reduxApis = [userApi, authApi];

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [userSlice.name],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

function generateStore() {
  return configureStore({
    reducer: persistedReducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    // @ts-ignore
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      })
        .prepend(listenerMiddleware.middleware)
        .concat(reduxApis.map(api => api.middleware))
        .concat(authMiddleware),
  });
}
export const store = generateStore();
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type State = ReturnType<typeof rootReducer>;
