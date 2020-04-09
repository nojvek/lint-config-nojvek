/* eslint-env node */
const {NODE_ENV = `development`} = process.env;
const WARN_IF_DEV = NODE_ENV === `development` ? `warn` : `error`;

function asTsEslintRules(/** @type {Record<String, [string, ...any[]]>} */ rules) {
  const tsRules = {};
  for (const [rule, ruleOpts] of Object.entries(rules)) {
    tsRules[`@typescript-eslint/${rule}`] = ruleOpts;
    tsRules[rule] = [`off`];
  }
  return tsRules;
}

/** @type {Record<String, [string, ...any[]]>} */
const TS_ES_RULES = {
  'no-unused-expressions': [`error`, {allowShortCircuit: true, allowTernary: true}],
  'no-unused-vars': [`error`, {argsIgnorePattern: `^_`}],
  'no-use-before-define': [`error`, {functions: false, classes: false}],
  'require-await': [`error`],
  camelcase: [`error`, {ignoreDestructuring: true}],
  quotes: [`error`, `backtick`],
};

const REACT_RULES = {
  'react/jsx-uses-react': [`error`],
  'react/jsx-uses-vars': [`error`],
};

const TS_OVERRIDE = {
  files: [`**/*.ts`, `**/*.tsx`],
  parser: `@typescript-eslint/parser`,
  parserOptions: {
    project: `./tsconfig.json`,
    tsconfigRootDir: __dirname,
    // turn this false when https://github.com/typescript-eslint/typescript-eslint/issues/1723 is fixed
    createDefaultProgram: true,
  },
  plugins: [`@typescript-eslint`],
  extends: [
    `eslint:recommended`,
    `plugin:@typescript-eslint/eslint-recommended`,
    `plugin:@typescript-eslint/recommended`,
    `plugin:@typescript-eslint/recommended-requiring-type-checking`,
    `prettier`,
    `prettier/@typescript-eslint`,
  ],
  rules: {
    // these eslint rules conflict with typescript-eslint rules
    // we replace the eslint rule with @typescript-eslint/{rule}
    ...asTsEslintRules(TS_ES_RULES),
    '@typescript-eslint/array-type': [`error`, {default: `array-simple`}],

    // these errors from recommended-requiring-type-checking are a bit too annoying
    '@typescript-eslint/ban-ts-ignore': [`off`],
    '@typescript-eslint/no-explicit-any': [`off`],
    '@typescript-eslint/explicit-function-return-type': [`off`],
    '@typescript-eslint/unbound-method': [`off`],
    '@typescript-eslint/no-empty-interface': [`off`],
  },
};

module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  extends: `eslint:recommended`,
  overrides: [TS_OVERRIDE],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: `module`,
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [`react`],
  settings: {
    react: {
      pragma: `h`,
    },
  },
  rules: {
    'arrow-parens': [`error`],
    'comma-dangle': [`error`, `always-multiline`],
    'comma-spacing': [`error`, {before: false, after: true}],
    'eol-last': [`error`],
    eqeqeq: [`error`],
    'key-spacing': [`error`, {beforeColon: false, afterColon: true, mode: `minimum`}],
    'keyword-spacing': [`error`],
    'linebreak-style': [`error`, `unix`],
    'no-console': [WARN_IF_DEV, {allow: [`info`, `warn`, `error`, `assert`]}],
    'no-control-regex': [`off`],
    'no-debugger': [WARN_IF_DEV],
    'no-multi-spaces': [`error`],
    'no-trailing-spaces': [`error`],
    'no-var': [`error`],
    'object-curly-spacing': [`error`, `never`],
    'object-shorthand': [`error`, `always`],
    'prefer-const': [`error`, {destructuring: `all`, ignoreReadBeforeAssign: true}],
    semi: [`error`, `always`],
    'sort-keys': [`off`],
    'space-before-blocks': [`error`, `always`],
    'space-before-function-paren': [`error`, {anonymous: `never`, named: `never`, asyncArrow: `always`}],
    ...REACT_RULES,
    ...TS_ES_RULES,
  },
};
