import { rest } from 'msw';
import { server } from '../test.utils';
import { ENDPOINT, MERCHANT_ENDPOINT } from './Example.apiSlice';

export const LOGO_URL = 'http://some-image-url';
const MERCHANT_ID = 'some-merchant-id';

export const setupSuccessfulVerifyApiKeyHandler = () => {
  server.use(
    rest.get(`http://localhost:3001/${ENDPOINT}`, (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ merchantId: MERCHANT_ID }));
    }),
    rest.get(`http://localhost:3001/${MERCHANT_ENDPOINT}/${MERCHANT_ID}`, (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          customFeatures: {
            imageUrl: {
              enabled: true,
              value: LOGO_URL,
            },
          },
        }),
      );
    }),
  );
};

export const setupVerifyApiKeyServerErrorHandler = () => {
  server.use(
    rest.get(`http://localhost:3001/${ENDPOINT}`, (_req, res, ctx) => {
      return res(ctx.status(500));
    }),
  );
};

export const setupGetMerchantDetailsServerErrorHandler = () => {
  server.use(
    rest.get(`http://localhost:3001/${ENDPOINT}`, (_req, res, ctx) => {
      return res.once(ctx.status(200), ctx.json({ merchantId: MERCHANT_ID }));
    }),
    rest.get(`http://localhost:3001/${MERCHANT_ENDPOINT}/${MERCHANT_ID}`, (_req, res, ctx) => {
      return res.once(ctx.status(500));
    }),
  );
};
