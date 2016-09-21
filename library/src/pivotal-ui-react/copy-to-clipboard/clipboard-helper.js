const ClipboardHelper = {
  select(window, document, element) {
    window.getSelection().removeAllRanges();
    const range = document.createRange();
    range.selectNode(element);
    window.getSelection().addRange(range);
  },

  copy(window, document, element) {
    ClipboardHelper.select(window, document, element);
    try {
      document.execCommand('copy');
    } catch (e) {
    } finally {
      window.getSelection().removeAllRanges();
    }
  }
};

module.exports = ClipboardHelper;