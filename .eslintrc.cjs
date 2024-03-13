module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      files: ['*.js', '*.cjs'],
      env: {
        node: true,
      },
      parserOptions: {
        sourceType: 'module',
      },
      rules: {
        semi: [2, 'always'],
        'linebreak-style': 0,
      },
    },
  ],
  ignorePatterns: ['/node_modules/', '/dist/', '/.parce-cache/'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
};
