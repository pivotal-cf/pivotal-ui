---
title: Inputs
reactPath: pivotal-ui/react/inputs
cssPath: pivotal-ui/css/inputs
reactComponents:
- Input
---

Most common form control, text-based input fields. Includes support for all HTML5 types: `text`, `password`, `datetime`, `datetime-local`, `date`, `month`, `time`, `week`, `number`, `email`, `url`, `search`, `tel`, and `color`.

Inputs will only be fully styled if their type is properly declared.

```jsx
//title=Text field
 <Input placeholder="Text input" type="text"/>;
```

```jsx
//title=Password field
<Input placeholder="Password" type="password"/>;
```

```jsx
//title=Size
//description=Input has a `size` attribute that takes three options: small, medium (default), and large.
<div>
    <Input placeholder="Date" type="date" size="small" className="mtxxl"/>
    <Input placeholder="Date" type="date" className="mtxxl"/>
    <Input placeholder="Date" type="date" size="large" className="mtxxl"/>
</div>;
```

```jsx
//title=With icon
<div>
    <Input placeholder="Search" icon="search"/>
    <Input placeholder="Success" icon="check" className="mtxxl"/>
</div>;
```

## Props

Property | Required | Type                              | Default  | Description
---------|----------|-----------------------------------|----------|------------
`icon`   | no       | String                            |          | See [Icons](/icons) for valid icon names
`size`   | no       | oneOf('small', 'medium', 'large') | 'medium' | Size variations
All other props are passed to the internal `<input>` tag.
