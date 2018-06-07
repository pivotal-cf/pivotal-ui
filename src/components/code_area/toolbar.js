import React from 'react';
import PropTypes from 'prop-types';
import {Icon} from 'pivotal-ui/react/iconography';
import {Checkbox} from 'pivotal-ui/react/checkbox';
import {Grid, FlexCol} from 'pivotal-ui/react/flex-grids';

export default class Toolbar extends React.Component {
  static propTypes = {
    title: PropTypes.node,
    file: PropTypes.string,
    name: PropTypes.string,
    toggleEditor: PropTypes.func,
    toggleHtmlPreview: PropTypes.func,
    isReact: PropTypes.bool,
    noHtml: PropTypes.bool
  };

  render() {
    const {title, file, name, toggleEditor, toggleHtmlPreview, isReact, noHtml} = this.props;

    const issueUrl = `https://github.com/pivotal-cf/pivotal-ui/issues/new?title=fix(${name})%3A%20description&body=**Steps%20to%20Reproduce**%0A%0A**Expected**%0A${name}%20should%20do%20this%0A%0A**Result**%0A${name}%20do%20not%20do%20this`;
    const githubUrl = `https://github.com/pivotal-cf/pui-styleguide/edit/master/docs/${file}`;

    return (
      <Grid className="toolbar">
        <FlexCol>
          <h4>{title}</h4>
        </FlexCol>
        <FlexCol fixed contentAlignment="middle">
          <a className="type-underline-hover" href={githubUrl} target="_blank">
            <Icon verticalAlign="baseline" src="github" className="toolbar--icon"/>
            <span className="toolbar--label mlm">Edit</span>
          </a>
        </FlexCol>
        <FlexCol fixed contentAlignment="middle">
          <a className="type-underline-hover" href={issueUrl} target="_blank">
            <Icon verticalAlign="baseline" src="error_outline" className="toolbar--icon"/>
            <span className="toolbar--label mlm">Issues</span>
          </a>
        </FlexCol>
        {isReact && (
          <FlexCol fixed contentAlignment="middle">
            <Checkbox labelClassName="em-high"
                      onClick={toggleEditor}
                      className="form-inline">
              <span className="toolbar--label mlm">React</span>
            </Checkbox>
          </FlexCol>
        )}
        {!noHtml && (
          <FlexCol fixed contentAlignment="middle">
            <Checkbox labelClassName="em-high"
                      onClick={toggleHtmlPreview}
                      className="form-inline">
              <span className="toolbar--label mlm">HTML</span>
            </Checkbox>
          </FlexCol>
        )}
      </Grid>
    );
  }
};