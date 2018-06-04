import React, {Component} from 'react';
import classnames from 'classnames';

const kebabCase = text => text
  .replace(/([a-z])([A-Z])/g, '$1-$2')
  .replace(/\s+/g, '-')
  .toLowerCase();

export default level => class extends Component {
  render() {
    const Type = `h${level}`;
    const {children: [text], className} = this.props;
    const id = kebabCase(text.toLowerCase());

    return (
      <Type {...this.props} {...{
        id,
        className: classnames(className, Type)
      }}/>
    );
  }
};