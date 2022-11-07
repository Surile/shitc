module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: [
      './tsconfig.json',
      './packages/client/tsconfig.json',
      './packages/cloud/tsconfig.json'
    ],
    extraFileExtensions: ['.vue']
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'standard-with-typescript',
    'plugin:prettier/recommended'
  ],
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'none',
        printWidth: 100,
        tabWidth: 2,
        semi: false,
        singleQuote: true,
        endOfLine: 'auto'
      }
    ],
    '@typescript-eslint/no-var-requires': 0,
    'no-void': 0,
    'vue/multi-word-component-names': 0,
    '@typescript-eslint/explicit-function-return-type': 0
  },
  globals: {
    uni: true,
    UniApp: true,
    wx: true
  }
}
