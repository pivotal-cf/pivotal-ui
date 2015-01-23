'use strict';

var _ = require('lodash');
var React = require('react/addons');

module.exports = _.transform([
  {name: 'Ul', Tag: 'ul', baseClassName: 'list-unordered', props: ['checked']},
  {name: 'Ol', Tag: 'ol'},
  {name: 'InlineList', baseClassName: 'list-inline', Tag: 'ul', props: ['divider']},
  {name: 'GroupList', baseClassName: 'list-group', Tag: 'ul'}
], function(memo, {name, baseClassName, Tag, props}) {
  memo[name] = React.createClass({
    renderChildren: function() {
      if (name !== 'GroupList') {
        return this.props.children;
      }
      return React.Children.map(this.props.children, c => React.addons.cloneWithProps(c, {className: 'list-group-item'}));
    },

    render: function() {
      var className = baseClassName;
      if (this.props.checked && props.indexOf('checked') !== -1) {
        className = 'list-checked';
      } else if (this.props.divider && props.indexOf('divider') !== -1) {
        className = 'list-inline-divider';
      }
      return (
        <Tag {...{className}}>
          {this.renderChildren()}
        </Tag>
      );
    }
  });
}, {});
