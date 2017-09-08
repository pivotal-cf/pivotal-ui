const select = (window, document, element) => {
  window.getSelection().removeAllRanges();
  const range = document.createRange();
  range.selectNode(element);
  window.getSelection().addRange(range);
};

const copy = (window, document, element) => {
  select(window, document, element);
  try {
    document.execCommand('copy');
  } catch (e) {
  } finally {
    window.getSelection().removeAllRanges();
  }
};

export default {select, copy};