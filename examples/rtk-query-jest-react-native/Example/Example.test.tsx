import { fireEvent, screen, waitFor } from '@testing-library/react-native';
import { EnterConfigScreen } from './Example';
import { renderWithProviders } from '../test.utils';
import {
  setupGetMerchantDetailsServerErrorHandler,
  setupSuccessfulVerifyApiKeyHandler,
  setupVerifyApiKeyServerErrorHandler,
} from './Example.msw';

describe('EnterConfigScreen', () => {
  describe('successful api key verification and getting merchant details', () => {
    beforeEach(() => setupSuccessfulVerifyApiKeyHandler());

    it('should update state and receive confirmation of order state change and navigate to select journey', async () => {
      const navigation = {
        navigate: jest.fn(),
      } as any;
      const { store } = renderWithProviders(<EnterConfigScreen navigation={navigation} />);

      // GIVEN ... user enters correct api key and an order description
      fireEvent.changeText(screen.getByPlaceholderText('Enter API Key'), 'apiKey');
      fireEvent.changeText(screen.getByPlaceholderText('Enter Default Order Description'), 'order description');

      // AND ... clicks confirm
      fireEvent.press(screen.getByText('Confirm'));

      // WHEN ... api key is verified successfully

      await waitFor(() => {
        // AND ... user is navigated to SelectJourney
        expect(navigation.navigate).toHaveBeenCalledTimes(1);
        expect(navigation.navigate).toHaveBeenCalledWith('SelectJourney');
      });
    });
  });

  describe('server error during api key verification', () => {
    beforeEach(() => setupVerifyApiKeyServerErrorHandler());

    it('should update the state and throw api key error when api key is incorrect and not navigate ', async () => {
      const navigation = {
        navigate: jest.fn(),
      } as any;
      const { store } = renderWithProviders(<EnterConfigScreen navigation={navigation} />);

      // GIVEN ... user enters incorrect api key
      fireEvent.changeText(screen.getByPlaceholderText('Enter API Key'), 'incorrect apiKey');
      fireEvent.changeText(screen.getByPlaceholderText('Enter Default Order Description'), 'order description');

      // AND ... clicks confirm
      fireEvent.press(screen.getByText('Confirm'));

      // WHEN ... there is a server error

      await waitFor(() => {
        // THEN ... error is shown
        expect(screen.getByText('ERROR')).toBeOnTheScreen();
        // AND ... user is not navigated
        expect(navigation.navigate).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe('server error getting merchant details', () => {
    beforeEach(() => setupGetMerchantDetailsServerErrorHandler());

    it('should update the state and throw api key error when api key is incorrect and not navigate ', async () => {
      const navigation = {
        navigate: jest.fn(),
      } as any;
      const { store } = renderWithProviders(<EnterConfigScreen navigation={navigation} />);

      // GIVEN ... user enters api key
      fireEvent.changeText(screen.getByPlaceholderText('Enter API Key'), 'apiKey');
      fireEvent.changeText(screen.getByPlaceholderText('Enter Default Order Description'), 'order description');

      // AND ... clicks confirm
      fireEvent.press(screen.getByText('Confirm'));

      // WHEN ... there is a server error

      await waitFor(() => {
        // THEN ... error is shown
        expect(screen.getByText('ERROR')).toBeOnTheScreen();
        // AND ... user is not navigated
        expect(navigation.navigate).toHaveBeenCalledTimes(0);
      });
    });
  });
});
