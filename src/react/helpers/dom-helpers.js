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
    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);

    return scrollbarWidth;
  },

  disableBodyScrolling: document => {
    if (!document) return {};

    scrollbarWidth = DomHelpers.getScrollbarWidth(document);
    const paddingRight = document.body.style.paddingRight;
    const overflow = document.body.style.overflow;

    const computedPaddingRight = window.getComputedStyle(
      document.body,
      null
    ).getPropertyValue('padding-right') || 0;

    const newPaddingRight = (parseFloat(scrollbarWidth) || 0) + (parseFloat(computedPaddingRight) || 0);
    document.body.style.paddingRight = `${newPaddingRight}px`;
    document.body.style.overflow = 'hidden';

    return {paddingRight, overflow};
  },

  enableBodyScrolling: ({paddingRight, overflow, document}) => {
    if (!document) return;

    document.body.style.paddingRight = paddingRight;
    document.body.style.overflow = overflow;
  }
};

export default DomHelpers;