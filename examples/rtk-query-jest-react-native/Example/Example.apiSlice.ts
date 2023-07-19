import { api } from '../redux/api';
import { transformResponse } from './Example.utils';

interface Params {
  _id: string;
}

interface VerifyApiKeyResponse {
  merchantId: string;
}

export interface MerchantResponse {
  name: string | null;
  customFeatures: {
    logo: {
      enabled: boolean;
      value: string | null;
    };
    imageUrl: {
      enabled: boolean;
      value: string | null;
    };
    paymentWidget: {
      enabled: boolean;
      value: string | null;
    };
  };
}

export const ENDPOINT = 'v1/auth/me';
export const MERCHANT_ENDPOINT = 'v1/merchants';

export const enterConfigApi = api.injectEndpoints({
  endpoints: (build) => ({
    verifyApiKey: build.query<VerifyApiKeyResponse, undefined>({
      query: () => ({
        url: ENDPOINT,
      }),
    }),
    getMerchant: build.query<ReturnType<typeof transformResponse>, Params>({
      query: (params) => ({
        url: `${MERCHANT_ENDPOINT}/${params._id}`,
      }),
      transformResponse: (response: MerchantResponse) => transformResponse(response),
    }),
  }),
  overrideExisting: __DEV__,
});

export const { useLazyVerifyApiKeyQuery, useLazyGetMerchantQuery } = enterConfigApi;
