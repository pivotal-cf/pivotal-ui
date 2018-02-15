const copy = (document, text) => {
  const textarea = document.createElement('textarea');
  textarea.className = 'sr-only';
  textarea.value = text;
  document.body.appendChild(textarea);

  try {
    textarea.select();
    document.execCommand('copy');
  } catch (e) {
  } finally {
    document.body.removeChild(textarea);
  }
};

export default {copy};
