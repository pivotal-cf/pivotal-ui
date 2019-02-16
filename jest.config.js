module.exports = {
  resetMocks: false,
  testRegex: ['\\.spec\\.[jt]sx?$'],
  setupFilesAfterEnv: [
    '<rootDir>/spec/support/jest-setup.js'
  ],
  setupFiles: [
    '<rootDir>/spec/support/jest-babel-polyfill.js'
  ],
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/spec/support/jest-empty-mock.js'
  }
};
