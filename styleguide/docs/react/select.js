/*doc
 ---
 title: Select
 name: select_react
 categories:
 - react_components_select
 - react_all
 ---

<code class="pam">
<img src="/styleguide/download.svg" width="16" height="16"/>
npm install pui-react-select --save

<img src="/styleguide/download.svg" width="16" height="16"/>
npm install babel-loader svg-react-loader --save-dev
</code>

(The extra loaders are for the [Iconography](/react_base_iconography.html) component.)

Import the subcomponents:

```
import {Select} from 'pui-react-select';
```

This is the basic select:

```react_example_table
<Select name='even-numbers' defaultValue='zero' options={['zero', 'two', 'four', 'six', 'eight']}/>
```

The `Select` component accepts the following optional properties:

Property           |  Type         | Description
-------------      | --------------| --------------------------------------------------------------------------
defaultValue       | Any           | The initial value for the select when the select is uncontrolled.
name               | String        | The name of the hidden input, useful when used in a form.
onChange           | Func          | Callback that fires when the select is changed, must be provided for controlled inputs.
onEntered          | Func          | Callback that fires after opening the select.
onExited           | Func          | Callback that fires after closing the select.
options            | Array         | Options for the select, can be string or numbers or an object with label and value (e.g. `['one', 'two', 'three']`, `[1, 2, 3]`, `[{label: 'yes', value: 1}, {label: 'no', value: 0}]`).
value              | Any           | The value for the select when it is controlled, must be used with an `onChange` function to update the value of the select.
*/
