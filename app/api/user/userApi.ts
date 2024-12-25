import {createApi} from '@reduxjs/toolkit/query/react';
import {UserApiModel} from '../../type/user/user.api-model';
import {baseQuery} from '../baseQuery';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery,
  tagTypes: ['USER'],
  endpoints: builder => ({
    signUp: builder.mutation<
      UserApiModel.CreateOne.Output,
      UserApiModel.CreateOne.Input
    >({
      query: body => ({url: 'user', method: 'POST', body}),
    }),
    getMe: builder.query<UserApiModel.GetMe.Output, UserApiModel.GetMe.Input>({
      providesTags: ['USER'],
      query: () => ({url: 'user/me', method: 'GET'}),
    }),
    syncContacts: builder.mutation<
      UserApiModel.SyncContact.Output,
      UserApiModel.SyncContact.Input
    >({
      query: (input: UserApiModel.SyncContact.Input) => ({
        url: 'user/sync-contacts',
        body: input,
        method: 'POST',
      }),
    }),
    updateProfilePicture: builder.mutation<
      UserApiModel.UpdateProfilePicture.Output,
      UserApiModel.UpdateProfilePicture.Input
    >({
      invalidatesTags: ['USER'],
      query: (input: UserApiModel.UpdateProfilePicture.Input) => ({
        url: 'user/profile-picture',
        body: input.formData,
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/form-data;',
        },
      }),
    }),
    deleteProfilePicture: builder.mutation<
      UserApiModel.DeleteProfilePicture.Output,
      UserApiModel.DeleteProfilePicture.Input
    >({
      invalidatesTags: ['USER'],
      query: () => ({
        url: 'user/profile-picture',
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useGetMeQuery,
  useUpdateProfilePictureMutation,
  useDeleteProfilePictureMutation,
  useSyncContactsMutation,
} = userApi;
