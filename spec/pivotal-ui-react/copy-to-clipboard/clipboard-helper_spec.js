import '../spec_helper' ;
import {copy} from '../../../src/react/copy-to-clipboard/clipboard-helper';

describe('ClipboardHelper', () => {
  let document, copyText, textarea;

  describe('copy', () => {
    beforeEach(() => {
      document = jasmine.createSpyObj('document', [
        'execCommand',
        'createElement'
      ]);

      document.body = jasmine.createSpyObj('body', [
        'appendChild',
        'removeChild'
      ]);

      textarea = jasmine.createSpyObj('textarea', ['select']);
      document.createElement.and.returnValue(textarea);

      copyText = 'Text to be copied';
      copy(document, copyText);
    });

    it('creates a textarea and appends it to the body', () => {
      expect(document.createElement).toHaveBeenCalledWith('textarea');
      expect(document.body.appendChild).toHaveBeenCalledWith(textarea);
    });

    it('sets the correct value and className on the textarea', () => {
      expect(textarea.value).toBe(copyText);
      expect(textarea.className).toBe('sr-only');
    });

    it('selects the textarea content', () => {
      expect(textarea.select).toHaveBeenCalled();
    });

    it('executes a copy command', () => {
      expect(document.execCommand).toHaveBeenCalledWith('copy');
    });

    it('removes the textarea from the body', () => {
      expect(document.body.removeChild).toHaveBeenCalledWith(textarea);
    });
  });
});
