/*doc
---
title: Lists
name: list_react
categories:
- react_base_lists
- react_all
---

<code class="pam">
<img src="/styleguide/download.svg" width="16" height="16"/>
npm install pui-react-lists --save
</code>

## Props

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
spacing   | no | oneOf('n', 's', 'm', 'l', 'xl') |       | Spacing between items
className | no | String                          |       | Classname of the list
unstyled  | no | Boolean                         | false | Whether to style the list
divider   | no | Boolean                         | false | Whether to include a divider between items

## Breadcrumb

Import the subcomponents:

```
import {BreadcrumbList, ListItem} from 'pui-react-lists';
```

```react_example
<BreadcrumbList>
  <ListItem><a href="/">Home</a></ListItem>
  <ListItem><a href="/react.html">React</a></ListItem>
  <ListItem className="current"><span>Lists</span></ListItem>
</BreadcrumbList>
```
*/

/*doc
---
title: Group
name: 06_list_group_react
parent: list_react
---

Import the subcomponents:

```
import {GroupList, ListItem} from 'pui-react-lists';
```

```react_example
<GroupList>
  <ListItem>Item 1</ListItem>
  <ListItem>Item 2</ListItem>
  <ListItem>Item 3</ListItem>
</GroupList>
```

## Group Inverse

Import the subcomponents:

```
import {GroupListInverse, ListItem} from 'pui-react-lists';
```

```react_example
<GroupListInverse>
  <ListItem>Item 1</ListItem>
  <ListItem>Item 2</ListItem>
  <ListItem>Item 3</ListItem>
</GroupListInverse>
```

## Inline

Import the subcomponents:

```
import {InlineList, ListItem} from 'pui-react-lists';
```

```react_example_table
<InlineList>
  <ListItem>Item 1</ListItem>
  <ListItem>Item 2</ListItem>
  <ListItem>Item 3</ListItem>
</InlineList>
```

```react_example_table
<InlineList divider>
  <ListItem>Item 1</ListItem>
  <ListItem>Item 2</ListItem>
  <ListItem>Item 3</ListItem>
</InlineList>
```

## Ordered

Import the subcomponents:

```
import {OrderedList, ListItem} from 'pui-react-lists';
```

```react_example_table
<OrderedList>
 <ListItem>Item 1</ListItem>
 <ListItem>Item 2</ListItem>
 <ListItem>Item 3</ListItem>
</OrderedList>
```

```react_example_table
<OrderedList unstyled>
  <ListItem>Item 1</ListItem>
  <ListItem>Item 2</ListItem>
  <ListItem>Item 3</ListItem>
</OrderedList>
```

## Steps

Import the subcomponent:

```
import {StepList, ListItem} from 'pui-react-lists';
```

```react_example
<StepList>
  <ListItem>Item 1</ListItem>
  <ListItem>Item 2</ListItem>
  <ListItem className="current">Item 3</ListItem>
</StepList>
```

## Unordered

Import the subcomponents:

```
import {UnorderedList, ListItem} from 'pui-react-lists';
```

```react_example_table
<UnorderedList>
  <ListItem>feep</ListItem>
  <ListItem>fop</ListItem>
  <ListItem>meep</ListItem>
</UnorderedList>
```

```react_example_table
<UnorderedList unstyled>
  <ListItem>Item 1</ListItem>
  <ListItem>Item 2</ListItem>
  <ListItem>Item 3</ListItem>
</UnorderedList>
```

## Configuring

List Spacing can be changed setting the size of the spacing property.

|Options|Values       | Pixels
|-------|-------------|-------
|`n`    |none         |0px
|`s`    |small        |5px
|`m`    |medium       |7px
|`l`    |large        |10px
|`xl`   |extra large  |21px

```react_example
<StepList spacing="n">
  <ListItem>Item 1</ListItem>
  <ListItem>Item 2</ListItem>
  <ListItem className="current">Item 3</ListItem>
</StepList>
```

```react_example
<UnorderedList spacing="xl">
  <ListItem>Item 1</ListItem>
  <ListItem>Item 2</ListItem>
  <ListItem className="current">Item 3</ListItem>
</UnorderedList>
```
*/
