module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'standard',
    'plugin:react/recommended',
    'prettier',
    'plugin:@typescript-eslint/recommended', // TypeScript 규칙 추가
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      parser: '@typescript-eslint/parser', // overrides 섹션의 parser도 업데이트
      files: ['.eslintrc.{js,cjs,ts,tsx}'], // TypeScript 파일 포함
      parserOptions: {
        sourceType: 'module', // script에서 module로 변경
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  ],
  parser: '@typescript-eslint/parser', // 기본 parser로 설정
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module', // TypeScript 파일을 위해 module로 설정
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    'react',
    '@typescript-eslint', // TypeScript 관련 플러그인 추가
  ],
  rules: {},
};
