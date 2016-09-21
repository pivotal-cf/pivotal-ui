require('../spec_helper');

const {itPropagatesAttributes} = require('../support/shared_examples');

describe('CopyToClipboard', () => {
  const text = 'some copy text';
  let onClick, CopyToClipboard, CopyToClipboardButton;

  beforeEach(() => {
    CopyToClipboard = require('../../../src/pivotal-ui-react/copy-to-clipboard/copy-to-clipboard').CopyToClipboard;
    CopyToClipboardButton = require('../../../src/pivotal-ui-react/copy-to-clipboard/copy-to-clipboard').CopyToClipboardButton;
    onClick = jasmine.createSpy('onClick');
    spyOn(document, 'execCommand');
  });

  describe('CopyToClipboard (basic)', () => {
    beforeEach(() => {
      ReactDOM.render(<CopyToClipboard {...{text, onClick, className: 'test-class', id: 'test-id', style: {opacity: '0.5'}}}/>, root);
    });

    it('renders the text', () => {
      expect('.sr-only').toHaveText(text);
    });

    itPropagatesAttributes('.copy-to-clipboard', {className: 'test-class', id: 'test-id', style: {opacity: '0.5'}});

    describe('when clicking on copy to clipboard', () => {
      beforeEach(() => {
        $('.copy-to-clipboard').simulate('click');
      });

      it('copies the text to the clipboard', () => {
        expect(document.execCommand).toHaveBeenCalledWith('copy');
      });

      it('calls the provided callback', () => {
        expect(onClick).toHaveBeenCalled();
      });
    });
  });

  describe('CopyToClipboardButton', () => {
    let Tooltip;

    beforeEach(() => {
      ReactDOM.render(<CopyToClipboardButton {...{text, onClick, className: 'test-class', id: 'test-id', style: {opacity: '0.5'}}}/>, root);
    });

    itPropagatesAttributes('.copy-to-clipboard-button', {className: 'test-class', id: 'test-id', style: {opacity: '0.5'}});


    describe('clicking on the button', () => {
      beforeEach(() => {
        Tooltip = require('pui-react-tooltip').Tooltip;
        spyOn(Tooltip.prototype, 'render').and.callThrough();
        $('.copy-to-clipboard-image').simulate('click');
      });

      it('renders a tooltip that says "Copied"', () => {
        expect('.pui-tooltip').toContainText('Copied');
      });

      it('hides tooltip after 3 seconds', () => {
        expect('.pui-tooltip:visible').toExist();
        jasmine.clock().tick(3500);
        expect('.pui-tooltip:visible').not.toExist();
      });

      it('copies the text to the clipboard', () => {
        expect(document.execCommand).toHaveBeenCalledWith('copy');
      });

      it('calls the provided callback', () => {
        expect(onClick).toHaveBeenCalled();
      });
    });
  });
});