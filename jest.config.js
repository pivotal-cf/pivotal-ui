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
    '^pivotal-ui/react/iconography/icons$': '<rootDir>/src/react/iconography/icons.js',
    '^pivotal-ui/(.*)': '<rootDir>/src/$1',
    '\\.(css|scss)$': '<rootDir>/spec/support/jest-empty-mock.js'
  }
};
