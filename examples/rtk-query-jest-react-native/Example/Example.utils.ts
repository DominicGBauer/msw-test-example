import type { MerchantResponse } from './Example.apiSlice';

export const transformResponse = (response: MerchantResponse) => {
  const merchantLogo = response.customFeatures.imageUrl.enabled ? response.customFeatures.imageUrl.value : undefined;

  return {
    merchantLogo,
  };
};
