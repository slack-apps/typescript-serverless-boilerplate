# node-typescript-boilerplate

👩🏻‍💻 Developer Ready: A comprehensive template. Works out of the box for most [Node.js](https://nodejs.org/en/docs/) projects.

🏃🏽 Instant Value: All basic tools included and configured:

- [TypeScript](https://www.typescriptlang.org/)
- [ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [ESLint](https://github.com/eslint/eslint) with some initial rules recommendation
- [Jest](https://facebook.github.io/jest/) for fast unit testing and code coverage
- Type definitions for Node.js and Jest
- [Prettier](https://prettier.io/) to enforce consistent code style
- NPM [scripts](#available-scripts) for common operations
- Simple example of TypeScript code and unit test
- .editorconfig for consistent file format
- Reproducible environments thanks to [Volta](https://volta.sh/)
- Example configuration for [GitHub Actions](https://github.com/features/actions)

## Getting Started

This project is intended for use with the latest Active LTS of [Node.js](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html) supported by AWS Lambda.

### Use as a repository template

To start, just click the **[Use template](https://github.com/ysato/node-typescript-boilerplate/generate)** link (or the green button). Start adding your code in the `src` and unit tests in the `__tests__` directories.

### Clone repository

To clone the repository, use the following commands:

```sh
git clone https://github.com/ysato/node-typescript-boilerplate
cd node-typescript-boilerplate
npm install
```

## Available Scripts

- `start` - run the application within a local,
- `clean` - remove coverage data, Jest cache and transpiled files,
- `prebuild` - lint source files and tests before building,
- `build` - transpile TypeScript to ES2020,
- `build:watch` - interactive watch mode to automatically transpile source files,
- `build:release` - clean and transpile source files for production usage,
- `lint` - lint source files and tests,
- `test` - run tests,
- `test:watch` - interactive watch mode to automatically re-run tests

## Inspired

Inspired by random tidbits of info on the internet and:

- https://github.com/jsynowiec/node-typescript-boilerplate
- https://github.com/alejandrogarciasalas/alejandro-node-boilerplate

## License

Licensed under the MIT License. See the [LICENSE](https://github.com/ysato/node-typescript-boilerplate/blob/master/LICENSE) file for details.
