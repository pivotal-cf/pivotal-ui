import React from 'react';
import {AllHtmlEntities} from 'html-entities';
import unified from 'unified';
import parse from 'remark-parse';
import reactRenderer from 'remark-react';
import PropTypes from 'prop-types';

import Toolbar from './toolbar';
import Editor from './ace_editor_wrapper';
import 'brace/mode/html';

export default class HtmlCodeArea extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    code: PropTypes.string.isRequired,
    noToolbar: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      code: props.code,
      showEditor: false,
      remark: unified().use(parse).use(reactRenderer)
    };
  }

  changeHandler = value => {
    this.setState({code: AllHtmlEntities.decode(value)});
  }

  toggleEditor() {
    this.setState({showEditor: !this.state.showEditor});
  }

  render() {
    const {code, remark} = this.state;
    const {title, description, noToolbar} = this.props;

    let content;

    if (!noToolbar) {
      content = (
        <div>
          <Toolbar showReact={false}
                   showHtml={this.state.showEditor}
                   title={title}
                   toggleHtml={this.toggleEditor.bind(this)}/>
          <div className="code-area-description">
            {remark.processSync(description).contents}
          </div>
        </div>
      );
    }

    return (
      <div className="code-editor">
        {content}
        <div className="code-editor--live-preview" dangerouslySetInnerHTML={{__html: code}}/>
        {this.state.showEditor && (
          <Editor {...{
            mode: 'html',
            code,
            readOnly: false,
            changeHandler: this.changeHandler
          }}/>
        )}
      </div>
    );
  }
}