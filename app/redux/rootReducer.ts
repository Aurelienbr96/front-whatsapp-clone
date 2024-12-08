import {combineReducers} from '@reduxjs/toolkit';
import {userApi} from '../api/user/userApi';
import {authApi} from '../api/auth/authApi';
import {userSlice} from './store/user.store';
import {bottomSheetSlice} from './store/bottomSheet';

export const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [userSlice.name]: userSlice.reducer,
  [bottomSheetSlice.name]: bottomSheetSlice.reducer,
});
