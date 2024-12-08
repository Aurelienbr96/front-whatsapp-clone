import {createSelector} from '@reduxjs/toolkit';

import {RootState} from '../store';

export const selectUserState = createSelector(
  (state: RootState) => state,
  state => state.user,
);

export const selectUser = createSelector(selectUserState, state => state.user);
export const selectIsLoggedIn = createSelector(
  selectUserState,
  state => state.isLogin,
);
