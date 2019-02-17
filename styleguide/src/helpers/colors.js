export const colorPalette = {
  neutral: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  dark: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  accent: [1, 2, 3, 4, 5, 6],
  error: [1, 2, 3, 4, 5, 6],
  warn: [1, 2, 3, 4, 5, 6],
  success: [1, 2, 3, 4, 5, 6],
  brand: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
};

export const colorNames = Object.keys(colorPalette).reduce((memo, key) => [
  ...memo,
  ...colorPalette[key].map(number => `${key}-${number}`)
], []);