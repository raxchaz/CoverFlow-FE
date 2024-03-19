module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['standard', 'plugin:react/recommended', 'prettier'],
  overrides: [
    {
      env: {
        node: true,
      },
      parser: 'babel-parser',
      files: ['.eslintrc.{js,cjs}', '**/*.{js,jsx,ts,tsx}'],
      rules: {
        '@typescript-eslint/no-unused-vars': [2, { args: 'none' }],
      },
      parserOptions: {
        sourceType: 'script',
        jsx: 'true',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: ['react'],
  rules: {},
};
