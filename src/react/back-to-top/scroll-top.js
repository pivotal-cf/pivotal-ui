const getScrollTop = (element, document) => {
  if (element) return element.scrollTop;
  return document.body.scrollTop || document.documentElement.scrollTop;
};
const setScrollTop = (value, element, document) => {
  if (element) element.scrollTop = value;
  else document.body.scrollTop = document.documentElement.scrollTop = value;
};
export default {getScrollTop, setScrollTop};