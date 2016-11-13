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

Require the subcomponent:

```
var Toggle = require('pui-react-toggle').Toggle;
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

Toggle has a `size` attribute that takes three options; small, medium (default), and large.

 ```react_example
 <div>
     <Toggle size='small'/>
     <Toggle size='medium'/>
     <Toggle/>
     <Toggle size='large'/>
 </div>
 ```

*/
