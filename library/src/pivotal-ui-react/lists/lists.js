import React from 'react';
import classnames from 'classnames';
import 'pui-css-lists';

const types = React.PropTypes;

export class ListItem extends React.Component {
  render() {
    return <li {...this.props}/>;
  }
}

const defList = (tagName, spacingType, classNames, childClassNames) => {
  return class extends React.Component {
    static propTypes = {
      spacing: types.oneOf(['n', 's', 'm', 'l', 'xl']),
      className: types.string,
      unstyled: types.bool,
      divider: types.bool
    }

    render() {
      let {className, spacing, children, unstyled, divider, ...others} = this.props;
      const classes = classnames(classNames(this.props), className, spacing && `${spacingType}${spacing}`);
      if (childClassNames) {
        children = React.Children.map(children, child => React.cloneElement(child, {className: childClassNames}));
      }
      
      return tagName === 'ul' ? <ul className={classes} {...others}>{children}</ul> :
        tagName === 'ol' ? <ol className={classes} {...others}>{children}</ol> :
          null;
    }
  };
};

export const UnorderedList = defList(
  'ul', 'lv',
  ({unstyled}) => classnames({
    'list-unordered': !unstyled,
    'list-unstyled': unstyled,
  })
);

export const OrderedList = defList('ol', 'lv', ({unstyled}) => classnames({'list-unstyled': unstyled}));
export const InlineList = defList('ul', 'lh', ({divider}) => classnames('list-inline', {'list-inline-divider': divider}));
export const GroupList = defList('ul', 'lv', () => classnames('list-group'), 'list-group-item');
export const GroupListInverse = defList('ul', 'lv', () => classnames('list-group-inverse'), 'list-group-item');
export const StepList = defList('ol', 'lh', () => classnames('list-steps'));
export const BreadcrumbList = defList('ul', 'lh', () => classnames('list-breadcrumb'));
