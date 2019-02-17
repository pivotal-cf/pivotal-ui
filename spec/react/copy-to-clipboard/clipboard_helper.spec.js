import ClipboardHelper from '../../../src/react/copy-to-clipboard/clipboard_helper';

describe('ClipboardHelper', () => {
  let document, copyText, textarea;

  describe('copy', () => {
    beforeEach(() => {
      document = {
        execCommand: jest.fn(),
        createElement: jest.fn()
      };

      document.body = {
        appendChild: jest.fn(),
        removeChild: jest.fn()
      };

      textarea = {select: jest.fn()};
      document.createElement.mockReturnValue(textarea);

      copyText = 'Text to be copied';
      ClipboardHelper.copy(document, copyText);
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
