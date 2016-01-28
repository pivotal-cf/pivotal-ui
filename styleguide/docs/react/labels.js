/*doc
---
title: Labels
name: label_react
categories:
 - react_base_labels
 - react_all
---

<code class="pam">
 <i class="fa fa-download" alt="Install the Component">
 npm install pui-react-labels --save
 </i>
 </code>

For the example, you also need to install [Typography][type_react] and require `DefaultH3` from it.

Require the subcomponent:

```
var Label = require('pui-react-labels').Label;
```

Labels are a straightforward implementation of the [Label][label] style.

Labels can be used on their own:

```react_example
<Label>yeah</Label>
```
Labels used within an element which already has font modifier styles will use the parents' styling. For example:

```react_example
<DefaultH3>
  Now the label is in a typography component <Label>yeah</Label>
</DefaultH3>
```
*/
