/* eslint-env node */
module.exports = {
    extends: ['eslint:recommended', 
              'plugin:@typescript-eslint/recommended',
              'plugin:@typescript-eslint/recommended-requiring-type-checking',
              'plugin:@typescript-eslint/strict'
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    ignorePatterns: ['dist/**'],
    parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
    },
    root: true,
  };