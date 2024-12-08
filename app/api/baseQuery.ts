import {fetchBaseQuery} from '@reduxjs/toolkit/query';

export const baseQuery = fetchBaseQuery({
  baseUrl:
    'https://a262-2a02-8308-205-1c00-b4d2-d2c9-d40d-e68b.ngrok-free.app/api/v1',
});
