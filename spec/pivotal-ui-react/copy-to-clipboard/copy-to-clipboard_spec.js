import '../spec_helper';
import {CopyToClipboard} from '../../../src/react/copy-to-clipboard';
import ClipboardHelper from '../../../src/react/copy-to-clipboard/clipboard-helper';

describe('CopyToClipboard', () => {
  let text, onClick, subject;

  beforeEach(() => {
    text = 'some copy text';
    onClick = jest.fn().mockName('onClick');

    spyOn(ClipboardHelper, 'copy');

    subject = shallow(<CopyToClipboard {...{
      text,
      onClick
    }}/>);
  });

  it('renders an anchor', () => {
    expect(subject.find('a.pui-copy-to-clipboard').exists()).toBeTruthy();
    expect(subject.find('a.pui-copy-to-clipboard').prop('role')).toBe('button');
  });

  it('renders a hidden tooltip with default text', () => {
    expect(subject.find('.tooltip-container').hasClass('tooltip-container-hidden')).toBeTruthy();
    expect(subject.find('.tooltip-content').text()).toBe('Copied');
  });

  describe('when given tooltip text', () => {
    beforeEach(() => {
      subject.setProps({tooltip: 'Copied successfully!'});
    });

    it('uses the custom tooltip text', () => {
      expect(subject.find('.tooltip-content').text()).toBe('Copied successfully!');
    });
  });

  describe('when given additional props', () => {
    beforeEach(() => {
      subject.setProps({className: 'test-class', id: 'test-id', style: {opacity: '0.5'}});
    });

    it('passes the props to the anchor', () => {
      expect(subject.find('a.pui-copy-to-clipboard').hasClass('test-class')).toBeTruthy();
      expect(subject.find('a.pui-copy-to-clipboard').prop('id')).toBe('test-id');
      expect(subject.find('a.pui-copy-to-clipboard').prop('style')).toEqual({opacity: '0.5'});
    });
  });

  describe('clicking on the element', () => {
    beforeEach(() => {
      subject.find('.pui-copy-to-clipboard .tooltip').simulate('click');
      subject.find('.pui-copy-to-clipboard').simulate('click');
    });

    it('makes tooltip visible', () => {
      expect(subject.find('.tooltip-container').hasClass('tooltip-container-visible')).toBeTruthy();
    });

    it('hides tooltip after 1 seconds', () => {
      jasmine.clock().tick(2000);
      expect(subject.find('.tooltip-container').hasClass('tooltip-container-visible')).toBeFalsy();
    });

    it('copies the text to the clipboard', () => {
      expect(ClipboardHelper.copy).toHaveBeenCalledWith(document, text);
    });

    it('calls the provided callback', () => {
      expect(onClick).toHaveBeenCalled();
    });
  });
});
