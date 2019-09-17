module.exports = {
  collectCoverage: true,
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  // The paths to modules that run some code to configure or set up the testing environment before each test
  testEnvironment: 'jest-environment-jsdom-fourteen',
  setupFiles: ['core-js'],
  setupFilesAfterEnv: [
    '<rootDir>/enzyme.config.js',
    '<rootDir>/__mocks__/localStorage.js'
  ],
  testPathIgnorePatterns: ['/node_modules/', '/cypress/'],

  moduleNameMapper: {
    '\\.(css|scss)$': require.resolve('./src/testUtils/styleMocks.js')
  }
};
