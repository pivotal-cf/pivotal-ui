const prism = require('prismjs');
const loadLanguages = require('prismjs/components/index');
loadLanguages();

const escapeHTML = input =>
  input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

module.exports = codeBlockNode => {
  const {value, lang} = codeBlockNode;
  const lines = value.split(/\r\n|\r|\n/);

  let title = '';
  const titleIndex = lines.findIndex(line => line.startsWith('//title='));
  if (titleIndex > -1) {
    title = lines[titleIndex].substring('//title='.length);
    lines.splice(titleIndex, 1);
  }

  let description = '';
  const descriptionIndex = lines.findIndex(line => line.startsWith('//description='));
  if (descriptionIndex > -1) {
    description = lines[descriptionIndex].substring('//description='.length);
    lines.splice(descriptionIndex, 1);
  }

  const strippedValue = lines.join('\n').trim();

  if (title) {
    return {
      type: 'html',
      value: `
        <code-editor
          language="${escapeHTML(lang)}"
          title="${escapeHTML(title)}"
          description="${escapeHTML(description)}"
          code="${escapeHTML(strippedValue)}">
        </code-editor>
      `
    };
  }

  if (prism.languages[lang]) {
    const highlighted = prism.highlight(strippedValue, prism.languages[lang], lang);
    const langClass = `language-${lang}`;

    return {
      type: 'html',
      value: `<pre class="sg-pre ${langClass}"><code class="sg-code ${langClass}">${highlighted}</code></pre>`
    };
  }
};