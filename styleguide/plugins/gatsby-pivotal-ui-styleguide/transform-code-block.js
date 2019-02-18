const prism = require('prismjs');
const loadLanguages = require('prismjs/components/index');
loadLanguages();

const interactiveLanguages = ['js', 'jsx', 'javascript', 'html'];

module.exports = codeBlockNode => {
  const {value, lang} = codeBlockNode;
  const lines = value.split(/\r\n|\r|\n/);

  let makeInteractive = interactiveLanguages.includes((lang || '').toLowerCase());

  const nonInteractive = lines.findIndex(line => line.startsWith('//nonInteractive'));

  if (nonInteractive > -1) {
    makeInteractive = false;
    lines.splice(nonInteractive, 1);
  }

  if (makeInteractive) {
    // return ...
  }

  if (prism.languages[lang]) {
    const highlighted = prism.highlight(value, prism.languages[lang], lang);
    const langClass = `language-${lang}`;

    return {
      type: 'html',
      value: `<pre class="${langClass}"><code class="${langClass}">${highlighted}</code></pre>`
    };
  }
};