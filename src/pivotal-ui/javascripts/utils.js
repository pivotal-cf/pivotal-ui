'use strict';

var Modernizr = require('modernizr');

var breakpoints = {
  xsMin: 480,
  smMin: 768,
  mdMin: 992,
  lgMin: 1200,
  xlMin: 1800
};

var utils = {
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
  },

  move: function(collection, startIndex, endIndex) {
    while (startIndex < 0) {
      startIndex += collection.length;
    }
    while (endIndex < 0) {
      endIndex += collection.length;
    }
    if (endIndex >= collection.length) {
      var k = endIndex - collection.length;
      while ((k--) + 1) {
        collection.push(undefined);
      }
    }
    collection.splice(endIndex, 0, collection.splice(startIndex, 1)[0]);
    return collection;
  }
};

module.exports = global.utils = utils;

function isMinWidth(width) {
  return Modernizr.mq('(min-width: ' + width + 'px)');
}
