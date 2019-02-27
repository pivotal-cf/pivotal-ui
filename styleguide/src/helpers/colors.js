export const colorGroups = {
  gray: ['black', 'dark-gray', 'gray', 'accent-gray', 'light-gray', 'white'],
  teal: ['teal', 'accent-teal', 'light-teal'],
  blue: ['dark-blue', 'blue', 'accent-blue', 'light-blue'],
  red: ['dark-red', 'red', 'light-red'],
  green: ['green', 'accent-green', 'light-green'],
  yellow: ['decorative-yellow', 'light-yellow']
};

export const colorNames = Object.keys(colorGroups).reduce((memo, key) => [
  ...memo,
  ...colorGroups[key]
], []);