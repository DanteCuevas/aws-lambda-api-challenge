module.exports = {
  // Indicates which environment (testEnvironment) the tests will run in
  testEnvironment: 'node',

  // The glob patterns Jest uses to detect test files
  testMatch: ['**/tests/**/*.ts', '**/?(*.)+(spec|test).ts'],

  // Transform files with TypeScript using ts-jest
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    '^.+\\.(js|jsx)?$': 'babel-jest'
  },

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // An array of regexp pattern strings that are matched against all module paths before those paths are to be considered "visible" to the module loader.
  modulePathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/node_modules/'
  ],

  // An array of directory names to be searched recursively up from the requiring module's location.
  moduleDirectories: ['node_modules', 'src'],

  // A map from regular expressions to module names that allow to stub out resources with a single module
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },

  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'ts', 'json', 'node'],

  // A preset that is used as a base for Jest's configuration
  preset: 'ts-jest',

  // Indicates whether each individual test should be reported during the run.
  verbose: true,

  // Indicates whether Jest should use the default watchman file watcher.
  // Watchman is a tool by Facebook for watching changes in the filesystem.
  // It improves performance, especially on large projects.
  // Set to false if you're experiencing issues with it.
  watchman: true
};
