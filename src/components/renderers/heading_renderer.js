import React, {Component} from 'react';
import kebabCase from 'lodash.kebabcase';
import classnames from 'classnames';

export default level => class extends Component {
  render() {
    const Type = `h${level}`;
    const {children: [text], className} = this.props;
    const id = kebabCase(text.toLowerCase());

    return (<Type {...this.props} {...{
      id,
      className: classnames(className, Type)
    }}/>);
  }
};