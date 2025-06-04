# Consent management frontend

This is a react application with vite as the bundler. It uses react router and material ui as the main libraries for the UI.

For testing vitest and react testing library were used. Together with msw for mocking the api (also used for mocking the api response when developing).

## Setup

To run the application install dependancies with `pnpm install` and then run with `pnpm dev`. This will run the application on port 3000.

### Testing

As mentioned above I used vitest and react testing library. To run the tests run `pnpm test`.

### Linting

Using biome to lint, format and check the code. For linting use command `pnpm lint`, formatting `pnpm format` and check with `pnpm check`. All these commands also have an auto fix feature by adding `:fix` at the end of the command.