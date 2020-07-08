module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['google', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'require-jsdoc': 0,
    'no-unused-vars': 0,
    // prettier conflicts with this and they don't want to deal with it...
    // 'operator-linebreak': [1, 'before'],
    'max-len': [1, 100],
  },
};
