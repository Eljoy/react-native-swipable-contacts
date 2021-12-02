const nodeModulesToIgnoreTransform = []

module.exports = {
  clearMocks: true,

  globals: {
    window: {},
  },

  preset: 'react-native',

  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },

  moduleDirectories: ['node_modules'],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node', 'd.ts'],

  testEnvironment: 'node',

  testMatch: ['**/*.test.ts?(x)'],

  testPathIgnorePatterns: ['/node_modules/'],

  setupFiles: ['./__tests__/__mock__.ts'],

  transformIgnorePatterns: [
    'node_modules/(?!(' + nodeModulesToIgnoreTransform.join('|') + '))',
  ],
}
