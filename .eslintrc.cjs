module.exports = {
  env: {
    browser: false,
    node: true,
    mocha: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  ignorePatterns: ['regtest-server/**/*.js'],
  rules: {
    'accessor-pairs': 'error',
    'array-bracket-newline': 'off',
    'array-bracket-spacing': 'error',
    'array-callback-return': 'error',
    'array-element-newline': 'off',
    'arrow-body-style': 'error',
    'arrow-parens': 'off',
    'arrow-spacing': [
      'error',
      {
        after: true,
        before: true,
      },
    ],
    'block-scoped-var': 'error',
    'block-spacing': 'error',
    'brace-style': 'error',
    'capitalized-comments': 'off',
    'class-methods-use-this': 'error',
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
      },
    ],
    'comma-spacing': [
      'error',
      {
        after: true,
        before: false,
      },
    ],
    'comma-style': ['error', 'last'],
    complexity: 'error',
    'computed-property-spacing': 'error',
    'consistent-return': 'off',
    'consistent-this': 'error',
    curly: 'off',
    'default-case': 'error',
    'default-case-last': 'error',
    'default-param-last': 'error',
    'dot-location': ['error', 'property'],
    'dot-notation': [
      'error',
      {
        allowKeywords: true,
      },
    ],
    'eol-last': 'error',
    eqeqeq: 'error',
    'func-call-spacing': 'error',
    'func-name-matching': 'error',
    'func-names': 'error',
    'func-style': 'error',
    'function-paren-newline': 'off',
    'generator-star-spacing': 'error',
    'grouped-accessor-pairs': 'error',
    'guard-for-in': 'error',
    'id-denylist': 'error',
    'id-length': 'off',
    'id-match': 'error',
    'implicit-arrow-linebreak': 'off',
    indent: ['error', 2],
    'init-declarations': 'off',
    'jsx-quotes': 'error',
    'key-spacing': 'error',
    'keyword-spacing': 'error',
    'line-comment-position': 'off',
    'linebreak-style': ['error', 'unix'],
    'lines-around-comment': 'error',
    'lines-between-class-members': 'off',
    'max-classes-per-file': 'error',
    'max-depth': 'error',
    'max-len': ['error', 120],
    'max-lines': 'error',
    'max-lines-per-function': 'error',
    'max-nested-callbacks': 'error',
    'max-params': ['error', 4],
    'max-statements': ['error', 21],
    'max-statements-per-line': 'error',
    'multiline-comment-style': 'off',
    'multiline-ternary': 'off',
    'new-parens': 'error',
    'newline-per-chained-call': 'error',
    'no-alert': 'error',
    'no-array-constructor': 'error',
    'no-sparse-arrays': 'off',
    'no-await-in-loop': 'error',
    'no-bitwise': 'off',
    'no-caller': 'error',
    'no-confusing-arrow': 'off',
    'no-console': 'error',
    'no-constructor-return': 'error',
    'no-continue': 'off',
    'no-div-regex': 'error',
    'no-duplicate-imports': 'error',
    'no-else-return': 'error',
    'no-empty-function': 'error',
    'no-eq-null': 'error',
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-extra-label': 'error',
    'no-extra-parens': 'off',
    'no-floating-decimal': 'error',
    'no-implicit-coercion': 'off',
    'no-implicit-globals': 'error',
    'no-implied-eval': 'error',
    'no-inline-comments': 'off',
    'no-invalid-this': 'error',
    'no-iterator': 'error',
    'no-label-var': 'error',
    'no-labels': 'error',
    'no-lone-blocks': 'error',
    'no-lonely-if': 'error',
    'no-loop-func': 'error',
    'no-loss-of-precision': 'error',
    'no-magic-numbers': [
      'warn',
      {
        ignoreArrayIndexes: true,
        ignoreClassFieldInitialValues: true,
        ignore: [-1, 0, 1, 2, 3, 100, 200, 201, 422],
      },
    ],
    'no-mixed-operators': 'off',
    'no-multi-assign': 'error',
    'no-multi-spaces': 'error',
    'no-multi-str': 'error',
    'no-multiple-empty-lines': 'error',
    'no-negated-condition': 'off',
    'no-nested-ternary': 'off',
    'no-new': 'error',
    'no-new-func': 'error',
    'no-new-object': 'error',
    'no-new-wrappers': 'error',
    'no-nonoctal-decimal-escape': 'error',
    'no-octal-escape': 'error',
    'no-param-reassign': 'error',
    'no-plusplus': 'off',
    'no-promise-executor-return': 'off',
    'no-proto': 'error',
    'no-restricted-exports': 'error',
    'no-restricted-globals': 'error',
    'no-restricted-imports': [
      'warn',
      { paths: [{ name: '.', message: 'Avoid imports from the index file on the same level.' }] },
    ],
    'no-restricted-properties': 'error',
    'no-restricted-syntax': 'error',
    'no-return-assign': 'off',
    'no-return-await': 'warn',
    'no-script-url': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-shadow': 'error',
    'no-tabs': 'error',
    'no-template-curly-in-string': 'error',
    'no-ternary': 'off',
    'no-throw-literal': 'error',
    'no-trailing-spaces': 'error',
    'no-undef-init': 'error',
    'no-undefined': 'off',
    'no-underscore-dangle': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unneeded-ternary': 'error',
    'no-unreachable-loop': 'error',
    'no-unsafe-optional-chaining': 'error',
    'no-unused-expressions': 'error',
    'no-unused-vars': 'off',
    'no-undef': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { destructuredArrayIgnorePattern: '^_' }],
    'no-use-before-define': 'error',
    'no-useless-backreference': 'error',
    'no-useless-call': 'error',
    'no-useless-computed-key': 'error',
    'no-useless-concat': 'error',
    'no-useless-constructor': 'error',
    'no-useless-rename': 'error',
    'no-useless-return': 'error',
    'no-var': 'error',
    'no-void': 'error',
    'no-warning-comments': ['error', { terms: ['todo', 'fixme'], location: 'anywhere' }],
    'no-whitespace-before-property': 'error',
    'nonblock-statement-body-position': 'error',
    'object-curly-newline': 'error',
    'object-curly-spacing': ['error', 'always'],
    'object-property-newline': 'off',
    'object-shorthand': 'error',
    'one-var': 'off',
    'one-var-declaration-per-line': 'error',
    'operator-assignment': 'error',
    'operator-linebreak': ['error', 'before'],
    'padded-blocks': 'off',
    'padding-line-between-statements': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    'prefer-destructuring': 'off',
    'prefer-exponentiation-operator': 'error',
    'prefer-named-capture-group': 'off',
    'prefer-numeric-literals': 'error',
    'prefer-object-spread': 'error',
    'prefer-promise-reject-errors': 'error',
    'prefer-regex-literals': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'off',
    'quote-props': 'off',
    quotes: ['error', 'single'],
    radix: 'error',
    'require-atomic-updates': 'error',
    'require-await': 'error',
    'require-unicode-regexp': 'error',
    'rest-spread-spacing': 'error',
    semi: ['error', 'never'],
    'semi-spacing': 'error',
    'semi-style': ['error', 'first'],
    'sort-keys': 'off',
    'sort-vars': 'error',
    'space-before-blocks': 'error',
    'space-before-function-paren': 'error',
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': 'error',
    'space-unary-ops': 'error',
    'spaced-comment': ['error', 'always'],
    strict: 'error',
    'switch-colon-spacing': 'error',
    'symbol-description': 'error',
    'template-curly-spacing': 'error',
    'template-tag-spacing': 'error',
    'unicode-bom': ['error', 'never'],
    'vars-on-top': 'error',
    'wrap-iife': 'error',
    'wrap-regex': 'off',
    'yield-star-spacing': 'error',
    yoda: 'error',
  },
  overrides: [
    {
      files: ['**/*.test.ts', 'test/**/*.ts', '**/*.cjs'],
      rules: {
        'no-magic-numbers': 'off',
        'max-lines-per-function': ['warn', 500],
        'max-statements': ['error', 30],
        'no-unused-expressions': 'off',
      },
    },
  ],
}
