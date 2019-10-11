module.exports = {
  "extends": "eslint-config-umi",
  "rules": {
    "space-before-function-paren": 0,
    'for-direction': 'error',
    'no-ex-assign': 'error',
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    'no-undef': [
      'error',
      {
        typeof: false,
      },
    ],
    'no-var': 'error',
    "object-curly-spacing": ["off"],
    'no-extra-semi': 'error',
    "camelcase": "off",
    'comma-dangle': ['off'],
    'comma-spacing': [
      'error',
      {
        before: false,
        after: true,
      },
    ],
    'key-spacing': [
      'error',
      {
        beforeColon: false,
        afterColon: true,
        mode: 'strict',
      },
    ],
    'no-multiple-empty-lines': [
      'error',
      {
        max: 3,
        maxEOF: 1,
        maxBOF: 1,
      },
    ],
    'arrow-spacing': [
      'error',
      {
        before: true,
        after: true,
      },
    ],
    'generator-star-spacing': [
      'error',
      {
        before: false,
        after: true,
      },
    ],
    'rest-spread-spacing': ['error', 'never'],
    'no-dupe-class-members': 'error',
    'no-duplicate-imports': 'error',
    'no-useless-constructor': 'error',
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        // args: 'all',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        flatTernaryExpressions: true,
      },
    ],
  }
}
