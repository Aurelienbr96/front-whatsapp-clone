import {createApi} from '@reduxjs/toolkit/query/react';

import {baseQuery} from '../baseQuery';
import {ContactApiModel} from '../../type/contact/contact.api-model';

export const contactApi = createApi({
  reducerPath: 'contactApi',
  baseQuery,
  tagTypes: ['CONTACT'],
  endpoints: builder => ({
    getContact: builder.query<
      ContactApiModel.GetUserContacts.Output,
      ContactApiModel.GetUserContacts.Input
    >({
      query: () => ({url: 'contact', method: 'GET'}),
    }),
  }),
});

export const {useGetContactQuery} = contactApi;
