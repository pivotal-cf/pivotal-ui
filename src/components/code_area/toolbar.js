import {Icon} from 'pivotal-ui/react/iconography';
import {Checkbox} from 'pivotal-ui/react/checkbox';

export default ({title, file, name, toggleEditor, toggleHtmlPreview, isReact}) => {
  const issueUrl = `https://github.com/pivotal-cf/pivotal-ui/issues/new?title=fix(${name})%3A%20description&body=**Steps%20to%20Reproduce**%0A%0A**Expected**%0A${name}%20should%20do%20this%0A%0A**Result**%0A${name}%20do%20not%20do%20this`;;
  const githubUrl = `https://github.com/pivotal-cf/pui-styleguide/edit/master/docs/${file}`;

  return (
    <div className="toolbar grid">
      <span className="col">
        <h4>{title}</h4>
      </span>
      <span className="col col-fixed">
        <a className="toolbar--item mlxl type-underline-hover" href={githubUrl} target="_blank">
          <Icon verticalAlign="baseline" src="github" className="toolbar--icon"/>
          <span className="toolbar--label mlm">Edit</span>
        </a>
        <a className="toolbar--item mlxl type-underline-hover" href={issueUrl} target="_blank">
          <Icon verticalAlign="baseline" src="error_outline" className="toolbar--icon"/>
          <span className="toolbar--label mlm">Issues</span>
        </a>
        {isReact && <span className="toolbar--item mlxl">
          <Checkbox labelClassName="em-high"
                    onClick={toggleEditor}
                    className="form-inline">
            <span className="toolbar--label mlm">React</span>
          </Checkbox>
        </span>}
        <span className="toolbar--item mlxl">
          <Checkbox labelClassName="em-high"
                    onClick={toggleHtmlPreview}
                    className="form-inline">
            <span className="toolbar--label mlm">HTML</span>
          </Checkbox>
        </span>
      </span>
    </div>
  );
}