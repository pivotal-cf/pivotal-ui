const isFirefox = () => navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;

const getScrollTop = () => isFirefox() ? document.documentElement.scrollTop : document.body.scrollTop;

const setScrollTop = value => {
  document.body.scrollTop = value;
  document.documentElement.scrollTop = value;
};

export default {getScrollTop, setScrollTop};