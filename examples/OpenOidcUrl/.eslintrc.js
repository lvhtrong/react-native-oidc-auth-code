module.exports = {
  parser: 'babel-eslint',
  extends: [
    'standard',
    'plugin:react/recommended',
    'plugin:jest/recommended',
    'plugin:jsx-control-statements/recommended'
  ],
  rules: {
    'react/prop-types': [2, { ignore: ['children', 'forwardedRef'] }],
    'react/jsx-no-undef': [2, { allowGlobals: true }]
  }
}
