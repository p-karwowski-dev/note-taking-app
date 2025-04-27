module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'eslint:recommended', // Base ESLint recommended rules
    'plugin:react/recommended', // React-specific linting rules
    'plugin:react-hooks/recommended', // React Hooks linting rules
    'plugin:@typescript-eslint/recommended', // TypeScript-specific linting rules
    'prettier', // Disable conflicting ESLint rules with Prettier
    'plugin:prettier/recommended', // Enable Prettier linting
  ],
  env: {
    node: true,
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': ['error', { singleQuote: true, semi: false }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
