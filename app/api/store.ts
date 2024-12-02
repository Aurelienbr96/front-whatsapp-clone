import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {userApi} from './auth/userApi';
import {authApi} from './auth/authApi';
import bottomSheetReducer from '../store/bottomSheet';

export const reduxApis = [userApi, authApi];

const reducers = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  ['bottomSheet']: bottomSheetReducer,
});

export const store = configureStore({
  reducer: reducers,
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(reduxApis.map(r => r.middleware)),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
