import {createApi} from '@reduxjs/toolkit/query/react';

import {baseQuery} from '../baseQuery';
import {AuthApiModel} from '../../type/auth/auth.api-model';

export interface ApiError {
  status: number;
  data: {
    message: string;
  };
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: builder => ({
    login: builder.mutation<
      AuthApiModel.Login.Output,
      AuthApiModel.Login.Input
    >({
      query: body => ({url: 'auth/login', method: 'POST', body}),

      transformErrorResponse: (err: ApiError) => {
        return err;
      },
    }),
    sendCode: builder.mutation<
      AuthApiModel.SendCode.Output,
      AuthApiModel.SendCode.Input
    >({
      query: body => ({url: 'auth/send-code', method: 'POST', body}),
    }),
    refreshToken: builder.mutation<
      AuthApiModel.Refresh.Output,
      AuthApiModel.Refresh.Input
    >({
      query: body => ({url: 'auth/refresh', method: 'POST', body}),
    }),
    logout: builder.mutation<
      AuthApiModel.Logout.Output,
      AuthApiModel.Logout.Input
    >({
      query: body => ({url: 'auth/logout', method: 'POST', body}),
    }),
  }),
});

export const {
  useLoginMutation,
  useSendCodeMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
} = authApi;
