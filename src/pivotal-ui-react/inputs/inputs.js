const classnames = require('classnames')
const React = require('react');
const {Tooltip} = require('pui-react-tooltip');
const {OverlayManual} = require('./overlay_manual');
const validator = require('email-validator');

const types = React.PropTypes;

const BasicInput = React.createClass({
  propTypes: {
    id: types.string,
    label: types.string,
    labelClassName: types.string,
    displayError: types.bool,
    errorMessage: types.string,
    inputClassName: types.string
  },

  render() {
    const {children, className, label, labelClassName, displayError, errorMessage, inputClassName, ...inputProps} = this.props;
    const {id} = inputProps;
    inputProps.className = classnames(inputClassName, 'form-control');
    const formClasses = classnames('form-group', displayError ? 'has-error' : '', className);
    const labelClasses = classnames('control-label', labelClassName);
    return (
      <div className={formClasses}>
        <label htmlFor={id} className={labelClasses}>{label}</label>
        <input {...inputProps}/>
        {children}
        {displayError && <div className="error-text help-block">
          {errorMessage ? errorMessage : `Please enter your ${label.toLowerCase()}.`}
        </div>}
      </div>
    );
  }
});

const EmailInput = React.createClass({
  propTypes: {
    id: types.string,
    label: types.string,
    labelClassName: types.string,
    change: types.func,
    setEmailValid: types.func,
    emailValid: types.bool,
    blur: types.func,
    email: types.string
  },

  emailVerification(email) {
    return validator.validate(email);
  },


  changeHandler(e) {
    const {change, setEmailValid, emailValid} = this.props;
    if (!emailValid) {
      setEmailValid(this.emailVerification(e.currentTarget.value));
    }
    change && change(e);
  },

  blurHandler(e) {
    const {blur, setEmailValid} = this.props;
    setEmailValid(this.emailVerification(e.currentTarget.value));
    blur && blur(e);
  },

  render() {
    const {email, emailValid, ...props} = this.props;
    const emailOverlay =
      (<Tooltip placement="top" className="email-error" id="emailError">
        Please enter a valid email address.
      </Tooltip>);
    return (
      <OverlayManual display={!emailValid} overlay={emailOverlay}>
        <BasicInput {...{name: 'email', id: 'emailInput', type: 'email', label: 'Email address', value: email, onChange: this.changeHandler, onBlur: this.blurHandler, ...props}}/>
      </OverlayManual>
    );
  }
});

module.exports = {
  BasicInput,
  EmailInput
};

/*doc
 ---
 title: Inputs
 name: inputs
 categories:
 - react_base_inputs
 - react_all
 ---

<code class="pam">
<i class="fa fa-download" alt="Install the Component">
npm install pui-react-tooltip pui-react-inputs --save
</i>
</code>

Require the subcomponents:

```
var BasicInput = require('pui-react-inputs').BasicInput;
```

You will need to wrap BasicInput in another component that will keep track of its state so that it is not lost during re-rendering.


```jsx_example

var Form = React.createClass({
  getInitialState: function() {
    return {email : ''};
  },

  change: function(e) {
    const states = {[e.currentTarget.getAttribute('name')]: e.currentTarget.value};
    this.setState(states);
  },

  render: function() {
    return (
      <div>
        <BasicInput name="email" id="emailInput" type="email" label="Email address" value={this.state.email} onChange={this.change}/>
      </div>
    )
  }
});

```

```react_example
<Form/>
```
*/