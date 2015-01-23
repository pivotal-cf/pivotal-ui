'use strict';

var _ = require('lodash');
var React = require('react/addons');

module.exports = _.transform([
  {name: 'Ul', Tag: 'ul', className: 'list-unordered', props: ['checked']},
  {name: 'Ol', Tag: 'ol'},
  {name: 'InlineList', className: 'list-inline', Tag: 'ul', props: ['divider']},
  {name: 'GroupList', className: 'list-group', Tag: 'ul'}
], function(memo, {name, className, props, Tag}) {
  memo[name] = React.createClass({
    renderChildren: function() {
      if (name !== 'GroupList') {
        return this.props.children
      }
      return React.Children.map(this.props.children, c => React.addons.cloneWithProps(c, {className: 'list-group-item'}));
    },

    render: function() {
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
