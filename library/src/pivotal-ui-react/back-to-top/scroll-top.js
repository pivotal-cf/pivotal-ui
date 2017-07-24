const isFirefox = () => navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;

export const getScrollTop = () => isFirefox() ? document.documentElement.scrollTop : document.body.scrollTop;

export const setScrollTop = value => {
  document.body.scrollTop = value;
  document.documentElement.scrollTop = value;
};
