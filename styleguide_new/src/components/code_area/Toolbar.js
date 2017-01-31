import {Icon} from 'pui-react-iconography'
import {InlineList, div} from 'pui-react-lists'

import {githubRepo, githubBranch, issueUrl} from '../../helpers/constants'

export default ({showReact, showHtml, title, file, name, toggleEditor, toggleHtmlPreview, isReact}) => {
  const githubUrl = `${githubRepo}/edit/${githubBranch}/styleguide_new/docs/${file}`

  const reactExtras = showReact ? 'toolbar--icon__checked' : 'toolbar--icon__unchecked'
  const reactClasses = `toolbar--icon ${reactExtras}`

  const htmlExtras = showHtml ? 'toolbar--icon__checked' : 'toolbar--icon__unchecked'
  const htmlClasses = `toolbar--icon ${htmlExtras}`

  return <div className="code-editor--toolbar toolbar">
    <span className="toolbar--left">
      <span>
        {title}
      </span>
    </span>
    <span className="toolbar--right">
      <a className="toolbar--item" href={githubUrl} target="_blank">
        <Icon verticalAlign="baseline" src="github" className="toolbar--icon"/>
        <span className="toolbar--label">Edit</span>
      </a>
      <a className="toolbar--item" href={issueUrl(name)} target="_blank">
        <Icon verticalAlign="baseline" src="info_outline" className="toolbar--icon"/>
        <span className="toolbar--label">Issues</span>
      </a>
      {isReact && <span className="toolbar--item" onClick={toggleEditor}>
        <Icon verticalAlign="baseline" className={reactClasses} src="check"/>
        <span className="toolbar--label">React</span>
      </span>}
      <span className="toolbar--item" onClick={toggleHtmlPreview}>
        <Icon verticalAlign="baseline" className={htmlClasses} src="check"/>
        <span className="toolbar--label">HTML</span>
      </span>
    </span>
  </div>
}