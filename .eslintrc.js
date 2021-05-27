module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react-hooks/recommended', // React hooks rules
    'plugin:jsx-a11y/recommended', // Accessibility rules
    'prettier/@typescript-eslint', // Prettier plugin
    'plugin:prettier/recommended' // Prettier recommended rules
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true
    },
    rules: {}
  }
}
