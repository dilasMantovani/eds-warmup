module.exports = {
  root: true,
  extends: [
    'airbnb-base',
    'plugin:json/recommended',
    'plugin:xwalk/recommended',
  ],
  env: {
    browser: true,
  },
  globals: {
    Jodit: true, Splide: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    allowImportExportEverywhere: true,
    sourceType: 'module',
    requireConfigFile: false,
  },
  ignorePatterns: [
    'styles/*.min.css',
  ],
  rules: {
    'import/extensions': ['error', { js: 'always' }], // require js file extensions in imports
    'no-param-reassign': [2, { props: false }], // allow modifying properties of param
    'max-len': 0,
    'no-unused-vars': 0,
    'linebreak-style': 0, // enforce unix linebreaks
    'xwalk/max-cells': 0,
    'no-plusplus': 0,
    'xwalk/no-orphan-collapsible-fields': 0,
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          './build/**',
        ],
        peerDependencies: true,
      },
    ],
  },
};
