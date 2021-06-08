# Helix Test Utilities

## Status
[![codecov](https://img.shields.io/codecov/c/github/adobe/helix-testutils.svg)](https://codecov.io/gh/adobe/helix-testutils)
[![CircleCI](https://img.shields.io/circleci/project/github/adobe/helix-testutils.svg)](https://circleci.com/gh/adobe/helix-testutils)
[![GitHub license](https://img.shields.io/github/license/adobe/helix-testutils.svg)](https://github.com/adobe/helix-testutils/blob/main/LICENSE.txt)
[![GitHub issues](https://img.shields.io/github/issues/adobe/helix-testutils.svg)](https://github.com/adobe/helix-testutils/issues)
[![LGTM Code Quality Grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/adobe/helix-testutils.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/adobe/helix-testutils) 

> Utility functions for testing Project Helix

## Usage

`condit` is a "conditional `it`" that can be used in Mocha tests to specify conditions that need to be met to run the test. It is being used for integration tests that depend on the presence of environment variables.

```javascript
const condit = require('@adobe/helix-testutils'); // add to your devDependencies

condit('This is an integration test', condit.hasenv('AUTH_TOKEN'), () => {
  // do your testing here
});

```

## Development


### Build

```bash
npm install
```

### Test

```bash
npm test
```

### Lint

```bash
npm run lint
```
