# Back To Top

## Basic usage

(The extra loaders are for the [Iconography](/react_base_iconography.html) component.)

Import the subcomponent:

```
import {BackToTop} from 'pui-react-back-to-top';
```

You can use this component to scroll to the top of a page.

The button will be fixed to the bottom right hand corner of the page.

You can place the link anywhere in your markup, but best practices are either towards the top or bottom of your markup.

```jsx
::title=Always Visible Example
<div>
<BackToTop alwaysVisible />
</div>
```

## Props

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
alwaysVisible  | no | Boolen | false | If `alwaysVisible` is not set, the component will only appear after the window has been scrolled.
