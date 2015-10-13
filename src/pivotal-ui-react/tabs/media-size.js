module.exports = {
  matches(screenSizeString) {
    const screenSizes = {
      xs: 0,
      sm: 768,
      md: 992,
      lg: 1200,
      xl: 1800
    };

    const minWidth = screenSizes[screenSizeString];

    return window.matchMedia(`(min-width: ${minWidth}px)`).matches;
  }
};
