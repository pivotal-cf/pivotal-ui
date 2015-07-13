var React = require('react');

/**
 * @component Radio
 * @description A radio button
 *
 * @property checked {Boolean} Whether the radio is currently selected
 * @property defaultChecked {Boolean} Whether the radio begins selected
 * @property name {String} An identifier for the radio for form submissions and associating it with a `<RadioGroup>`
 * @property value {String} The value used for `name` on form submission
 * @property onChange {Function} A callback called when the radio is checked or unchecked
 * @property id {String} An identifier for the radio that can be used, for example, with labels
 *
 * @example ```js
 * var Radio = require('pui-react-radio').Radio;
 * var MyComponent = React.createClass({
 *   render() {
 *     return <Radio name="Question 1" value="Choice 1">Label Text</Radio>;
 *   }
 * });
 * ```
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#form_radio_input_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/forms.html#form_checkboxes)
 */
var Radio = React.createClass({
  propTypes: {
    checked: React.PropTypes.bool,
    defaultChecked: React.PropTypes.bool,
    name: React.PropTypes.string,
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
    id: React.PropTypes.string
  },

  render: function() {
    return (
      <div className="radio">
        <label><input type="radio" {...this.props}/></label>
      </div>
    );
  }
});

module.exports = {Radio};
