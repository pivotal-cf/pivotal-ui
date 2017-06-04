import React, {Component} from 'react';
import kebabCase from 'lodash.kebabcase';

export default level => class extends Component {
  render() {
    const Type = `h${level}`;
    const {children: [text]} = this.props;
    const id = kebabCase(text.toLowerCase());
    return <Type {...this.props} {...{id}}/>;
  }
}