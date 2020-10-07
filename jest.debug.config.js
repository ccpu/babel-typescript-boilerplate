var config = require('./jest.config');

module.exports = {
  ...config,
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};
