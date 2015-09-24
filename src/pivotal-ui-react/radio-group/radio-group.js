var React = require('react/addons');
var cloneWithProps = React.addons.cloneWithProps;
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
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#form_radio_input_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/forms.html#form_checkboxes)
 */
var RadioGroup = React.createClass({
  propTypes: {
    id: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {onChange: () => null};
  },

  onChange: function(e) {
    this.props.onChange(e.target.value);
  },

  render: function() {
    var {name, children, ...others} = this.props;
    children = React.Children.map(children, (child) => cloneWithProps(child, {name, onChange: this.onChange}));
    var props = mergeProps(others, {className: 'radio-group'});


    return <div {...props} >{children}</div>;
  }
});

module.exports = {RadioGroup};

/*doc
---
title: Forms
name: form_react
categories:
 - react_components_forms
 - react_all
---
*/


/*doc
---
title: Radio Inputs
name: form_radio_input_react
parent: form_react
---

<code class="pam">
<i class="fa fa-download" alt="Install the Component">
npm install pui-react-radio pui-react-radio-group --save
</i>
</code>

For the example, you also need to install [Grids](#grid_react) and require `Col` from it.

Require the subcomponents:

```
var RadioGroup = require('pui-react-radio-groups');
var Radio = require('pui-react-radio');
```

Using React radio buttons in a form is fairly straightforward.

```react_example
<RadioGroup name="field_name">
  <Radio value="firstValue">You could click this radio button</Radio>
  <Radio value="SecondValue" defaultChecked>This is also a radio button</Radio>
</RadioGroup>
```

In this case, the `name` attached to `RadioGroup` will be applied to all of Radio children.

Additionally, special behaviors can be added to the `onChange` event handler
exposed by radio groups. In this example, additional form controls are displayed
when the user selects the third radio button.

Similar to the `name` property, the `onChange` handlers is passed down to all child components.

```jsx_example
var MyComponent = React.createClass({
  getInitialState: function() { return {selection: null}; },

  change: function(value) {
    this.setState({selection: value});
  },

  render: function() {
    return (
      <form role="form" className="form-horizontal">
        <div className="form-group">
          <Col md={3}>
            <label>Options</label>
          </Col>
          <Col md={21}>
            <RadioGroup name="stuff" onChange={this.change}>
              <Radio value="others">Others</Radio>
              <Radio value="others1" defaultChecked>More others</Radio>
              <Radio value="special">Click for more!</Radio>
            </RadioGroup>
          </Col>
        </div>
        {this.state.selection === 'special' && (<div className="form-group">
          <Col md={3}>
            <label>Stuff that appears</label>
          </Col>
          <Col md={21}>
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" />
          </Col>
        </div>)}
      </form>
    );
  }
});
```

```react_example
<MyComponent />
```

*/
