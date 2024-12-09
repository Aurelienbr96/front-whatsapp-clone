import {createSlice} from '@reduxjs/toolkit';
import {authApi} from '../../api/auth/authApi';
import {UserDomainModel} from '../../type/user/user-domain.model';

export interface UserStoreState {
  isLogin?: boolean;
  user: UserDomainModel.User;
}

const initialState: UserStoreState = {
  isLogin: false,
  user: UserDomainModel.nullUser,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: builder => {
    /* Auth API */
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (_state, action) => {
        return {
          isLogin: true,
          user: action.payload,
        };
      },
    );
    builder.addMatcher(
      authApi.endpoints.login.matchPending,
      () => initialState,
    );
    builder.addMatcher(authApi.endpoints.refreshToken.matchRejected, () => {
      return initialState;
    });
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, () => {
      return initialState;
    });
    builder.addMatcher(authApi.endpoints.login.matchRejected, () => {
      return initialState;
    });
    /* Refresh token API */
    builder.addMatcher(
      authApi.endpoints.refreshToken.matchFulfilled,
      (_state, action) => {
        return {
          isLogin: true,
          user: action.payload,
        };
      },
    );
  },
});

// Action creators are generated for each case reducer function
export const {reset} = userSlice.actions;

export default userSlice.reducer;
