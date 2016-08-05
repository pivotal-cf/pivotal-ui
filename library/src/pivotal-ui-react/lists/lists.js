var React = require('react');
import classnames from 'classnames';
const types = React.PropTypes;
require('pui-css-lists');

class ListItem extends React.Component {
  render() {
    return <li {...this.props}/>;
  }
}

function defList(tagName, spacingType, classNames, childClassNames) {
  return class extends React.Component {
    static propTypes = {
      spacing: types.oneOf(['n', 's', 'm', 'l', 'xl']),
      className: types.string,
      checked: types.bool,
      unstyled: types.bool,
      divider: types.bool
    };

    render() {
      var {className, spacing, children, checked, unstyled, divider, ...others} = this.props;
      var classes = classnames(classNames(this.props), className, spacing && `${spacingType}${spacing}`);
      if (childClassNames) {
        children = React.Children.map(children, child => React.cloneElement(child, {className: childClassNames}));
      }
      return (
        tagName === 'ul' ? <ul className={classes} {...others}>{children}</ul> :
        tagName === 'ol' ? <ol className={classes} {...others}>{children}</ol> :
        null
      );
    }
  }
}

var UnorderedList = defList(
  'ul', 'lv',
  ({unstyled, checked}) => classnames({
    'list-unordered': !unstyled && !checked,
    'list-unstyled': unstyled,
    'list-checked': checked
  })
);

var OrderedList = defList('ol', 'lv', ({unstyled}) => classnames({'list-unstyled': unstyled}));

var InlineList = defList('ul', 'lh', ({divider}) => classnames('list-inline', {'list-inline-divider': divider}));

var GroupList = defList('ul', 'lv', () => classnames('list-group'), 'list-group-item');

var GroupListInverse = defList('ul', 'lv', () => classnames('list-group-inverse'), 'list-group-item');

var StepList = defList('ol', 'lh', () => classnames('list-steps'));

var BreadcrumbList = defList('ul', 'lh', () => classnames('list-breadcrumb'));

module.exports = {
  ListItem,
  UnorderedList,
  OrderedList,
  InlineList,
  GroupList,
  GroupListInverse,
  StepList,
  BreadcrumbList
};
