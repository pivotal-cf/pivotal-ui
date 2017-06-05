import {Icon} from 'pui-react-iconography';
import {InlineList, div} from 'pui-react-lists';
import {Checkbox} from 'pui-react-checkbox';
import {githubRepo, githubBranch, issueUrl} from '../../helpers/constants';

export default ({showReact, showHtml, title, file, name, toggleEditor, toggleHtmlPreview, isReact}) => {
  const githubUrl = `${githubRepo}/edit/${githubBranch}/styleguide_new/docs/${file}`;

  const reactExtras = showReact ? 'toolbar--icon__checked' : 'toolbar--icon__unchecked';
  const reactClasses = `toolbar--icon ${reactExtras}`;

  const htmlExtras = showHtml ? 'toolbar--icon__checked' : 'toolbar--icon__unchecked';
  const htmlClasses = `toolbar--icon ${htmlExtras}`;

  return (<div className="code-editor--toolbar toolbar">
    <span className="toolbar--left">
      <h4>{title}</h4>
    </span>
    <span className="toolbar--right">
      <a className="toolbar--item" href={githubUrl} target="_blank">
        <Icon verticalAlign="baseline" src="github" className="toolbar--icon"/>
        <span className="toolbar--label type-underline-hover">Edit</span>
      </a>
      <a className="toolbar--item" href={issueUrl(name)} target="_blank">
        <Icon verticalAlign="baseline" src="error_outline" className="toolbar--icon"/>
        <span className="toolbar--label type-underline-hover">Issues</span>
      </a>
      {isReact && <span className="toolbar--item">
        <Checkbox label={<span className="toolbar--label">React</span>}
                  inputClassName={reactClasses}
                  onClick={toggleEditor}
                  className="form-inline"/>
      </span>}
      <span className="toolbar--item" >
        <Checkbox label={<span className="toolbar--label">HTML</span>}
                  inputClassName={htmlClasses}
                  onClick={toggleHtmlPreview}
                  className="form-inline"/>
      </span>
    </span>
  </div>);
}