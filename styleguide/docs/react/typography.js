/*doc
---
title: Typography
name: type_react
categories:
 - react_base_typography
 - react_all
---

<code class="pam">
<i class="fa fa-download" alt="Install the Component">
npm install pui-react-typography --save
</i>
</code>

 We have three type systems. Which one you choose depends on your product.

 * Marketing sites should use the largest styles, for example `<MarketingH1>A Top Level Heading</MarketingH1>`
 * Most sites will use our default headings, for example `<DefaultH1>A Top Level Heading</DefaultH1>`
 * Rarely, sites will need a smaller type scale, for example `<AlternateH1>A Top Level Heading</AlternateH1>`

Require the subcomponents:


*/

/*doc
---
title: Default
name: 01_type_default_react
parent: type_react
---

```
var DefaultH1 = require('pui-react-typography').DefaultH1;
var DefaultH2 = require('pui-react-typography').DefaultH2;
var DefaultH3 = require('pui-react-typography').DefaultH3;
var DefaultH4 = require('pui-react-typography').DefaultH4;
var DefaultH5 = require('pui-react-typography').DefaultH5;
var DefaultH6 = require('pui-react-typography').DefaultH6;
```

```react_example_table
<DefaultH1>h1 31px</DefaultH1>

<DefaultH2>h2 25px</DefaultH2>

<DefaultH3>h3 20px</DefaultH3>

<DefaultH4>h4 18px</DefaultH4>

<DefaultH5>h5 16px</DefaultH5>

<DefaultH6>h6 13px</DefaultH6>
```
*/

/*doc
---
title: Alternate
name: 02_type_alt_react
parent: type_react
---

```
var AlternateH1 = require('pui-react-typography').AlternateH1;
var AlternateH2 = require('pui-react-typography').AlternateH2;
var AlternateH3 = require('pui-react-typography').AlternateH3;
var AlternateH4 = require('pui-react-typography').AlternateH4;
var AlternateH5 = require('pui-react-typography').AlternateH5;
var AlternateH6 = require('pui-react-typography').AlternateH6;
```

```react_example_table
<AlternateH1>This is an H1</AlternateH1>

<AlternateH2>This is an H2</AlternateH2>

<AlternateH3>This is an H3</AlternateH3>

<AlternateH4>This is an H4</AlternateH4>

<AlternateH5>This is an H5</AlternateH5>

<AlternateH6>This is an H6</AlternateH6>
```
*/

/*doc
---
title: Marketing
name: 03_type_marketing_react
parent: type_react
---

```
var MarketingH1 = require('pui-react-typography').MarketingH1;
var MarketingH2 = require('pui-react-typography').MarketingH2;
var MarketingH3 = require('pui-react-typography').MarketingH3;
var MarketingH4 = require('pui-react-typography').MarketingH4;
var MarketingH5 = require('pui-react-typography').MarketingH5;
var MarketingH6 = require('pui-react-typography').MarketingH6;
```

```react_example_table
<MarketingH1>This is an h1</MarketingH1>

<MarketingH2>This is an h2</MarketingH2>

<MarketingH3>This is an h3</MarketingH3>

<MarketingH4>This is an h4</MarketingH4>

<MarketingH5>This is an h5</MarketingH5>

<MarketingH6>This is an h6</MarketingH6>
```
*/

/*doc
---
title: Custom
name: 04_type_custom_react
parent: type_react
---

```
var Heading = require('pui-react-typography').Heading;
```

Usually, you want to use the provided headings. If your mock doesn't exactly match, you should try the normal headings,
and see if it still looks ok. If it doesn't (this should be rare!) you can use our custom type generator.

You may want to wrap this in a custom reusable React component rather than calling it directly.

```react_example
<Heading element="h1" bold="high" color="type-brand-5">This is a custom h1</Heading>
```*/
