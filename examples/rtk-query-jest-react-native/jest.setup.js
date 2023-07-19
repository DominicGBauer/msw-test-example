import '@testing-library/jest-native/extend-expect';
import { Animated } from 'react-native';
import { server } from './test.utils';

// this is here because of https://stackoverflow.com/a/68956430
Animated.timing = () => ({
  start: () => jest.fn(),
  _isUsingNativeDriver: () => jest.fn(),
  _startNativeLoop: () => jest.fn(),
});

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
