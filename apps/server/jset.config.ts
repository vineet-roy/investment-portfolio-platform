module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: true,
    coverageDirectory: 'coverage',
    moduleDirectories: ['node_modules', 'src'],
    moduleNameMapper: {
      '^src/(.*)$': '<rootDir>/src/$1', // Adjust for your module paths
    },
    testMatch: ['<rootDir>/src/**/*.spec.ts'], // Specify the pattern for test files
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
    setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'], // Optional setup file for global test configuration
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.json', // Path to your TypeScript configuration
      },
    },
  };
  