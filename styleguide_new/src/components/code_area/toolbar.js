import {Icon} from 'pui-react-iconography';
import {Checkbox} from 'pui-react-checkbox';
import {githubRepo, githubBranch, issueUrl} from '../../helpers/constants';

export default ({showReact, showHtml, title, file, name, toggleEditor, toggleHtmlPreview, isReact}) => {
  const githubUrl = `${githubRepo}/edit/${githubBranch}/styleguide_new/docs/${file}`;

  const reactExtras = showReact ? 'toolbar--icon__checked' : 'toolbar--icon__unchecked';
  const reactClasses = `toolbar--icon ${reactExtras}`;

  const htmlExtras = showHtml ? 'toolbar--icon__checked' : 'toolbar--icon__unchecked';
  const htmlClasses = `toolbar--icon ${htmlExtras}`;

  return (
    <div className="code-editor--toolbar toolbar grid">
      <span className="col">
        <h4>{title}</h4>
      </span>
      <span className="col col-fixed">
        <a className="toolbar--item mlxl type-underline-hover" href={githubUrl} target="_blank">
          <Icon verticalAlign="baseline" src="github" className="toolbar--icon"/>
          <span className="toolbar--label mll">Edit</span>
        </a>
        <a className="toolbar--item mlxl type-underline-hover" href={issueUrl(name)} target="_blank">
          <Icon verticalAlign="baseline" src="error_outline" className="toolbar--icon"/>
          <span className="toolbar--label mll">Issues</span>
        </a>
        {isReact && <span className="toolbar--item mlxl">
          <Checkbox label={<span className="toolbar--label mll">React</span>}
                    inputClassName={reactClasses}
                    onClick={toggleEditor}
                    className="form-inline"/>
        </span>}
        <span className="toolbar--item mlxl">
          <Checkbox label={<span className="toolbar--label mll">HTML</span>}
                    inputClassName={htmlClasses}
                    onClick={toggleHtmlPreview}
                    className="form-inline"/>
        </span>
      </span>
    </div>
  );
}