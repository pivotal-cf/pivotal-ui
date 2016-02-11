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
name: 02_form_radio_input_react
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
var RadioGroup = require('pui-react-radio-groups').RadioGroup;
var Radio = require('pui-react-radio').Radio;
```

Using React radio buttons in a form is fairly straightforward.

```react_example
<RadioGroup name="field_name">
  <Radio value="firstValue">You could click this radio button</Radio>
  <Radio value="SecondValue" defaultChecked>This is also a radio button</Radio>
  <Radio value="ThirdValue" disabled>This is a disabled radio button</Radio>
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

  change: function(e) {
    this.setState({selection: e.target.value});
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
        {this.state.selection === 'special' && (

          <div className="form-group">
            <Col md={3}>
              <label>Stuff that appears</label>
            </Col>
            <Col md={21}>
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" />
            </Col>
          </div>

        )}
      </form>
    );
  }
});
```

```react_example
<MyComponent />
```

*/
