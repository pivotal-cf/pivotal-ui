var React = require('react');
import {mergeProps} from 'pui-react-helpers';

/**
 * @component RadioGroup
 * @description A group of radio buttons
 *
 * @property id {String} An identifier for the radio group that can be used, for example, with labels
 * @property name {String} An identifier for the radio group and all of its radio buttons for form submissions
 * @property onChange {Function} A callback called when radio buttons inside of the radio group are checked or unchecked
 *
 * @example ```js
 * var RadioGroup = require('pui-react-radio-group').RadioGroup;
 * var Radio = require('pui-react-radio').Radio;
 * var MyComponent = React.createClass({
 *   render() {
 *     return (
 *       <RadioGroup name="question-1">
 *         <Radio value="choice-1">Choice 1</Radio>
 *         <Radio value="choice-2">Choice 2</Radio>
 *         <Radio value="choice-3">Choice 3</Radio>
 *       </RadioGroup>
 *     );
 *   }
 * });
 * ```
 *
 */
var RadioGroup = React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func
  },

  render: function() {
    var {name, children, onChange, ...others} = this.props;

    children = React.Children.map(children,
      (child) => React.cloneElement(child, {name, onChange: onChange})
    );

    var props = mergeProps(others, {className: 'radio-group'});


    return <div {...props} >{children}</div>;
  }
});

module.exports = {RadioGroup};
