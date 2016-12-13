/*doc
---
title: Dividers
name: divider_react
categories:
- react_base_dividers
- react_all
---

<code class="pam">
<img src="/styleguide/download.svg" width="16" height="16"/>
npm install pui-react-dividers --save
</code>

Import the subcomponents:

```
import {Divider} from 'pui-react-dividers';
import {InverseDivider} from 'pui-react-dividers';
```

Dividers draw horizontal lines between different content groupings.

```react_example_table
<Divider />

<Divider size="large" />
```

On a dark background, use these inverse dividers

```react_inverse_example_table
<div className="type-dark-11">
  I am some content
  <InverseDivider />
  Me too
</div>

<div className="type-dark-11">
  Here's some stuff above the divider
  <InverseDivider size="large" />
  Here's some stuff below the divider
</div>
```
*/
