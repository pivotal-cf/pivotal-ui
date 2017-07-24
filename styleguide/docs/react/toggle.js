/*doc
---
title: Toggle
name: toggle_react
parent: form_react
---

<code class="pam">
  <img src="/styleguide/download.svg" width="16" height="16"/>
  npm install pui-react-toggle --save
</code>

## Props

Property | Required | Type                              | Default  | Description
---------|----------|-----------------------------------|----------|------------
id       | no       | String                            |          | The id of the element
onChange | no       | Function                          |          | Callback that gets fired when toggle occurs
size     | no       | oneOf('small', 'medium', 'large') | 'medium' | Size variations

## Basic usage

Import the subcomponent:

```
import {Toggle} from 'pui-react-toggle';
```

The Toggle component takes an `onChange` callback.

```react_example
<Toggle onChange={() => console.log('I have been toggled!')}/>
```

Toggles accept a `checked` prop that turns on the switch.
Note that you must handle the addition and removal of the `checked` property yourself.

```react_example
<Toggle checked onChange={() => console.log('I should handle check changes!')}/>
```

Toggle has a `size` attribute that takes three options: small, medium (default), and large.

```react_example
<div className="grid">
  <div className="col col-top form-group">
    <label className="label-lg">Large</label>
    <Toggle size="large"/>
  </div>
  <div className="col col-top form-group">
    <label>Medium</label>
    <Toggle size="medium"/>
  </div>
  <div className="col col-top form-group">
    <label className="label-sm">Small</label>
    <Toggle size="small"/>
  </div>
</div>
```
*/
