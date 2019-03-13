---
title: Select
cssPath: pivotal-ui/css/select
---

Use the `select` element when the user can choose a single option out of a set of possible options.

```html
//title=Sizing
//description=Set heights using the CSS classes `.input-lg` and `.input-sm`. Create larger or smaller form controls that match button sizes.
<div>
  <select class="input-lg">
    <option>Option 1</option>
    <option>Option 2</option>
  </select>
  <select class="mtxl">
    <option>Option 1</option>
    <option>Option 2</option>
  </select>
  <select class="input-sm mtxl">
    <option>Option 1</option>
    <option>Option 2</option>
  </select>
</div>
```

In React, a `select` can be given `value` and `onChange` props to make it a controlled component.

```jsx
//title=Controlled React component
function MyForm() {
  const colors = ['red', 'green', 'blue', 'yellow'];
  const [color, setColor] = React.useState('red');

  return (
    <div>
      <div>currently selected: {color}</div>
      <select value={color} onChange={evt => setColor(evt.target.value)}>
        {colors.map(color => <option key={color} value={color}>{color}</option>)}
      </select>
    </div>
  );
}

<MyForm/>
```

## Props

The native HTML `select` takes standard HTML attributes as props. [Read more about the `select` element.](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select)
