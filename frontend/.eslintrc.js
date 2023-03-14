module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
    'plugin:prettier/recommended',
    'plugin:tailwindcss/recommended',
  ],
  plugins: ['react', '@typescript-eslint', 'prettier'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    tailwindcss: {
      callees: ['classnames', 'cx', 'tw', 'css'],
      classRegex: /^(?:className=)?(?:cx\()?(["'])(.*?)\1(?:(?:\))?)$/,
    },
    react: {
      version: 'detect',
    },
  },
  rules: {
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: 'import', next: 'export' },
      { blankLine: 'always', prev: 'block-like', next: '*' },
      { blankLine: 'always', prev: 'multiline-block-like', next: '*' },
      { blankLine: 'always', prev: ['case', 'default'], next: '*' },
    ],
    'react-hooks/exhaustive-deps': 'off',
    'react/display-name': 'off',
    'react/jsx-no-undef': ['off'],
    'react/prop-types': ['off'],
    'tailwindcss/classnames-order': [
      'warn',
      {
        prependCustom: true,
        officialSorting: true,
      },
    ],
    'tailwindcss/no-custom-classname': ['off'],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: false },
    ],
  },
}
