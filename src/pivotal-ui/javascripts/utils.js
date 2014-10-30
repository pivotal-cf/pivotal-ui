'use strict';

var breakpoints = {
  xsMin: 480,
  smMin: 768,
  mdMin: 992,
  lgMin: 1200,
  xlMin: 1800
};

module.exports = window.utils = {
  isMinWidthXs: function minWidthXs() {
    return isMinWidth(breakpoints.xsMin);
  },

  isMinWidthSm: function minWidthXs() {
    return isMinWidth(breakpoints.smMin);
  },

  isMinWidthMd: function minWidthXs() {
    return isMinWidth(breakpoints.mdMin);
  },

  isMinWidthLg: function minWidthXs() {
    return isMinWidth(breakpoints.lgMin);
  },

  isMinWidthXl: function minWidthXs() {
    return isMinWidth(breakpoints.xlMin);
  }
};

function isMinWidth(width) {
  return window.matchMedia('(min-width: ' + width + 'px)').matches;
}
