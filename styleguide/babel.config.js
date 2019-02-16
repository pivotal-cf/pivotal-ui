module.exports = {
  presets: [
    ['@babel/preset-env', {'loose': true}],
    '@babel/preset-react'
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-function-bind'
  ]
};