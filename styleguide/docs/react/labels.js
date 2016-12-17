/*doc
---
title: Labels
name: label_react
categories:
- react_base_labels
- react_all
---

<code class="pam">
<img src="/styleguide/download.svg" width="16" height="16"/>
npm install pui-react-labels --save
</code>

Import the subcomponents:

```
import {Label} from 'pui-react-labels';
```

Labels are a straightforward implementation of the [Label][label] style.

Labels can be used on their own:

```react_example
<Label>yeah</Label>
```

Labels used within an element which already has font modifier styles will use
the parents' styling. For example:

```react_example
<h3>
  Now the label is in a typography component <Label>yeah</Label>
</h3>
```
*/
