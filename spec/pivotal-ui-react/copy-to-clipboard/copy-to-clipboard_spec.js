import '../spec_helper';
import {CopyToClipboard} from '../../../src/react/copy-to-clipboard';
import ClipboardHelper from '../../../src/react/copy-to-clipboard/clipboard-helper';

describe('CopyToClipboard', () => {
  let text, onClick, subject;

  beforeEach(() => {
    text = 'some copy text';
    onClick = jasmine.createSpy('onClick');

    spyOn(ClipboardHelper, 'copy');

    subject = ReactDOM.render(<CopyToClipboard {...{
      text,
      onClick
    }}/>, root);
  });

  it('renders an anchor', () => {
    expect('a.pui-copy-to-clipboard').toExist();
    expect('a.pui-copy-to-clipboard').toHaveAttr('role', 'button');
  });

  it('renders a hidden tooltip with default text', () => {
    expect('.tooltip-container').toHaveClass('tooltip-container-hidden');
    expect('.tooltip-content').toHaveText('Copied');
  });

  describe('when given tooltip text', () => {
    beforeEach(() => {
      subject::setProps({tooltip: 'Copied successfully!'});
    });

    it('uses the custom tooltip text', () => {
      expect('.tooltip-content').toHaveText('Copied successfully!');
    });
  });

  describe('when given additional props', () => {
    beforeEach(() => {
      subject::setProps({className: 'test-class', id: 'test-id', style: {opacity: '0.5'}});
    });

    it('passes the props to the anchor', () => {
      expect('a.pui-copy-to-clipboard').toHaveClass('test-class');
      expect('a.pui-copy-to-clipboard').toHaveAttr('id', 'test-id');
      expect('a.pui-copy-to-clipboard').toHaveCss({opacity: '0.5'});
    });
  });

  describe('clicking on the element', () => {
    beforeEach(() => {
      $('.pui-copy-to-clipboard .tooltip').click();
      $('.pui-copy-to-clipboard').click();
    });

    it('makes tooltip visible', () => {
      expect('.tooltip-container').toHaveClass('tooltip-container-visible');
    });

    it('hides tooltip after 1 seconds', () => {
      jasmine.clock().tick(2000);
      expect('.tooltip-container').not.toHaveClass('tooltip-container-visible');
    });

    it('copies the text to the clipboard', () => {
      expect(ClipboardHelper.copy).toHaveBeenCalledWith(document, text);
    });

    it('calls the provided callback', () => {
      expect(onClick).toHaveBeenCalled();
    });
  });
});
