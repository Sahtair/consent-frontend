import { cleanup } from '@testing-library/react'
import 'vitest-dom/extend-expect';
import { setupServer } from 'msw/node';
import { handlers } from '../src/api';
export const server = setupServer(...handlers);

// Establish API mocking before all tests.
beforeAll(() => {
 server.listen({
    // This tells MSW to throw an error whenever it
    // encounters a request that doesn't have a
    // matching request handler.
    onUnhandledRequest: 'error'
  });
});

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
})