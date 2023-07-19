import type { FetchArgs } from '@reduxjs/toolkit/query/react';
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import Constants from 'expo-constants';
import type { RootState } from './store';

const staggeredBaseQueryWithBailOut = retry(
  async (args: string | FetchArgs, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: Constants.expoConfig?.extra?.apiUrl || 'http://localhost:3001',
      headers: {
        'content-type': 'application/json',
      },
      prepareHeaders: (headers, { getState }) => {
        const state = getState() as RootState;
        return headers;
      },
    })(args, api, extraOptions)

    return result;
  },
  {
    maxRetries: process.env.NODE_ENV === 'test' ? 0 : 5,
  },
);

export const api = createApi({
  baseQuery: staggeredBaseQueryWithBailOut,
  keepUnusedDataFor: process.env.NODE_ENV === 'test' ? 0 : 60,
  endpoints: () => ({}),
});
