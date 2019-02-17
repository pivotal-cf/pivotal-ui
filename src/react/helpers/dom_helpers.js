let scrollbarWidth;

const DomHelpers = {
  documentExists: () => typeof global.document !== 'undefined',
  getActiveElement: () => global.document.activeElement,
  setTimeout: (handler, timeout) => global.setTimeout(handler, timeout),
  clearTimeout: handler => global.clearTimeout(handler),

  findTabbableElements: el => el && el.querySelectorAll(
    '[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
  ),

  getScrollbarWidth: document => {
    if (scrollbarWidth) return scrollbarWidth;
    if (!document) return 0;

    const scrollDiv = document.createElement('div');
    scrollDiv.style.width = '100px';
    scrollDiv.style.height = '100px';
    scrollDiv.style.overflow = 'scroll';
    scrollDiv.style.position = 'absolute';
    scrollDiv.style.top = '-9999px';
    document.body.appendChild(scrollDiv);
    scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);

    return scrollbarWidth;
  },

  disableBodyScrolling: document => {
    if (!document) return {};

    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return overflow;
  },

  enableBodyScrolling: ({overflow, document}) => {
    if (!document) return;

    document.body.style.overflow = overflow;
  }
};

export default DomHelpers;