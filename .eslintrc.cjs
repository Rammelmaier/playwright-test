module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    'no-multi-spaces': 'error',
    'no-trailing-spaces': 'error',
    'no-unreachable': 'error',
    'max-len': [2, 140, 4],
    'quotes': ['error', 'single', { 'avoidEscape': true }],
  },
};
