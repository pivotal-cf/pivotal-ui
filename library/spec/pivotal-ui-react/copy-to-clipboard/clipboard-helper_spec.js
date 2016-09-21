require('../spec_helper');

describe('ClipboardHelper', () => {
  let subject;

  beforeEach(() => {
    subject = require('../../../src/pivotal-ui-react/copy-to-clipboard/clipboard-helper');
  });

  describe('copy', () => {
    const element = 'mock element';
    let window, document, range, selection;
    beforeEach(() => {
      range = jasmine.createSpyObj('range', ['selectNode']);
      selection = jasmine.createSpyObj('selection', ['removeAllRanges', 'addRange']);
      window = jasmine.createSpyObj('window', ['getSelection']);
      window.getSelection.and.returnValue(selection);
      document = jasmine.createSpyObj('document', ['createRange', 'execCommand']);
      document.createRange.and.returnValue(range);
    });

    it('does some useful things', () => {
      subject.copy(window, document, element);
      expect(selection.removeAllRanges).toHaveBeenCalled();
      expect(selection.addRange).toHaveBeenCalledWith(range);
      expect(range.selectNode).toHaveBeenCalledWith(element);
      expect(document.execCommand).toHaveBeenCalledWith('copy');
      expect(selection.removeAllRanges.calls.count()).toBe(2);
    });
  });

  describe('select', () => {
    const element = 'mock element';
    let window, document, range, selection;
    beforeEach(() => {
      range = jasmine.createSpyObj('range', ['selectNode']);
      selection = jasmine.createSpyObj('selection', ['removeAllRanges', 'addRange']);
      window = jasmine.createSpyObj('window', ['getSelection']);
      window.getSelection.and.returnValue(selection);
      document = jasmine.createSpyObj('document', ['createRange']);
      document.createRange.and.returnValue(range);
    });

    it('does some useful things', () => {
      subject.select(window, document, element);
      expect(selection.removeAllRanges).toHaveBeenCalled();
      expect(selection.addRange).toHaveBeenCalledWith(range);
      expect(range.selectNode).toHaveBeenCalledWith(element);
    });
  });
});