import {createApi} from '@reduxjs/toolkit/query/react';
import {UserApiModel} from '../../type/user/user.api-model';
import {baseQuery} from '../baseQuery';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery,
  // TODO remove
  endpoints: builder => ({
    signUp: builder.mutation<
      UserApiModel.CreateOne.Output,
      UserApiModel.CreateOne.Input
    >({
      query: body => ({url: 'user', method: 'POST', body}),
    }),
    getMe: builder.query<UserApiModel.GetMe.Output, UserApiModel.GetMe.Input>({
      query: () => ({url: 'user/me', method: 'GET'}),
    }),
  }),
});

export const {useSignUpMutation, useGetMeQuery} = userApi;
