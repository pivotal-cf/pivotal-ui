import marked from 'marked'
import {AllHtmlEntities} from 'html-entities'

const normalRenderer = new marked.Renderer()
normalRenderer.options.langPrefix = 'lang-' // for some reason 'undefined' if you don't set it manually

const renderer = new marked.Renderer()
const customRenderLanguages = ['js', 'jsx', 'html']

renderer.code = (rawContent, language, escaped) => {
  if(!customRenderLanguages.includes(language)) {
    return normalRenderer.code(rawContent, language, escaped)
  }

  const lines = rawContent.split('\n')
  let title = ''

  if(lines[0].includes('::title=')) {
    title = lines[0]
    lines.splice(0, 1)
    title = title.replace('::title=', '')
  }

  const content = lines.join('\n')

  return `<div class="code-area lang-${language}">
    <div class="code-area--title">${title}</div>
    <pre>${AllHtmlEntities.encode(content)}</pre>
  </div>`
}


export default markdown => {
  return marked(markdown, {renderer: renderer});
}