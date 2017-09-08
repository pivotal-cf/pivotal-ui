import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export class ListItem extends React.PureComponent {
  render() {
    return <li {...this.props}/>;
  }
}

const defList = (tagName, classNames, childClassNames) => {
  return class extends React.Component {
    static propTypes = {
      className: PropTypes.string,
      unstyled: PropTypes.bool,
      divider: PropTypes.bool
    };

    componentDidMount() {
      require('../../css/lists');
    }

    render() {
      let {className, children, unstyled, divider, ...others} = this.props;
      const classes = classnames(classNames(this.props), className);
      if(childClassNames) {
        children = React.Children.map(children, child => React.cloneElement(child, {className: childClassNames}));
      }

      return tagName === 'ul' ? <ul className={classes} {...others}>{children}</ul>
        : tagName === 'ol' ? <ol className={classes} {...others}>{children}</ol>
          : null;
    }
  };
};

export const UnorderedList = defList('ul', ({unstyled, divider}) => classnames({'list-unordered': !unstyled, 'list-unstyled': unstyled, 'list-divider': divider}));
export const OrderedList = defList('ol', ({unstyled, divider}) => classnames({'list-unstyled': unstyled, 'list-divider': divider}));
export const InlineList = defList('ul', ({divider}) => classnames('list-inline', {'list-inline-divider': divider}));
export const BreadcrumbList = defList('ul', () => classnames('list-breadcrumb'));
