import '../spec_helper';

import {CopyToClipboard, CopyToClipboardButton} from 'pui-react-copy-to-clipboard';

describe('CopyToClipboard', () => {
  const text = 'some copy text';
  let onClick, getWindow, window, document, range, selection, subject;

  beforeEach(() => {
    onClick = jasmine.createSpy('onClick');

    range = jasmine.createSpyObj('range', ['selectNode']);
    selection = jasmine.createSpyObj('selection', ['removeAllRanges', 'addRange']);
    window = jasmine.createSpyObj('window', ['getSelection']);
    getWindow = jasmine.createSpy('getWindow').and.returnValue(window);
    document = jasmine.createSpyObj('document', ['createRange', 'execCommand']);

    document.createRange.and.returnValue(range);
    window.document = document;
    window.getSelection.and.returnValue(selection);
  });

  describe('CopyToClipboard (basic)', () => {
    const renderComponent = props => ReactDOM.render(<CopyToClipboard {...props}/>, root);

    it('renders the text', () => {
      subject = renderComponent({text, onClick, className: 'test-class', id: 'test-id', style: {opacity: '0.5'}});
      expect('.sr-only').toHaveText(text);
    });

    it('propagates attributes', () => {
      subject = renderComponent({text, onClick, className: 'test-class', id: 'test-id', style: {opacity: '0.5'}});

      expect('.copy-to-clipboard').toHaveClass('test-class');
      expect('.copy-to-clipboard').toHaveAttr('id', 'test-id');
      expect('.copy-to-clipboard').toHaveCss({opacity: '0.5'});
    });

    it('click copies text to clipboard and calls provided callback', () => {
      subject = renderComponent({
        getWindow,
        text,
        onClick,
        className: 'test-class',
        id: 'test-id',
        style: {opacity: '0.5'}
      });

      $('.copy-to-clipboard').simulate('click');

      expect(document.execCommand).toHaveBeenCalledWith('copy');
      expect(onClick).toHaveBeenCalled();
    });
  });

  describe('CopyToClipboardButton', () => {
    const renderComponent = props => ReactDOM.render(<CopyToClipboardButton {...props}/>, root);

    beforeEach(() => {
      subject = renderComponent({text, onClick, className: 'test-class', id: 'test-id', style: {opacity: '0.5'}});
    });

    it('propagates attributes', () => {
      expect('.copy-to-clipboard').toHaveClass('test-class');
      expect('.copy-to-clipboard').toHaveAttr('id', 'test-id');
      expect('.copy-to-clipboard').toHaveCss({opacity: '0.5'});
    });

    it('renders a default flat button', () => {
      expect('.copy-to-clipboard .btn').toHaveClass('btn-default-flat');
    });

    it('renders a copy icon in the button', () => {
      expect('.copy-to-clipboard .btn svg').toHaveClass('icon-copy');
    });

    describe('when large prop is true', () => {
      beforeEach(() => {
        subject::setProps({large: true});
      });

      it('renders a large button', () => {
        expect('.copy-to-clipboard .btn').toHaveClass('btn-lg');
      });
    });

    describe('when small prop is true', () => {
      beforeEach(() => {
        subject::setProps({small: true});
      });

      it('renders a small button', () => {
        expect('.copy-to-clipboard .btn').toHaveClass('btn-sm');
      });
    });

    describe('clicking on the button', () => {
      it('renders a tooltip that says "Copied"', () => {
        subject = renderComponent({
          getWindow,
          text,
          onClick,
          className: 'test-class',
          id: 'test-id',
          style: {opacity: '0.5'}
        });

        $('.clipboard-button').simulate('click');

        expect('.tooltip-container').toHaveClass('tooltip-container-visible');
        expect('.tooltip-content').toHaveText('Copied');
      });

      it('hides tooltip after 1 seconds', () => {
        subject = renderComponent({
          getWindow,
          text,
          onClick,
          className: 'test-class',
          id: 'test-id',
          style: {opacity: '0.5'}
        });

        $('.copy-to-clipboard').simulate('click');
        jasmine.clock().tick(2000);

        expect('.tooltip-container').not.toHaveClass('tooltip-container-visible');
      });

      it('copies the text to the clipboard', () => {
        subject = renderComponent({
          getWindow,
          text,
          onClick,
          className: 'test-class',
          id: 'test-id',
          style: {opacity: '0.5'}
        });

        $('.copy-to-clipboard').simulate('click');

        expect(document.execCommand).toHaveBeenCalledWith('copy');
      });

      it('calls the provided callback', () => {
        subject = renderComponent({
          getWindow,
          text,
          onClick,
          className: 'test-class',
          id: 'test-id',
          style: {opacity: '0.5'}
        });

        $('.copy-to-clipboard').simulate('click');

        expect(onClick).toHaveBeenCalled();
      });
    });
  });
});