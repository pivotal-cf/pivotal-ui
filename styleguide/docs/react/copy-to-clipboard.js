/*doc
---
title: Copy To Clipboard
name: copy_to_clipboard_react
categories:
- react_components_copy-to-clipboard
- react_all
---

<code class="pam">
<img src="/styleguide/download.svg" width="16" height="16"/>
npm install pui-react-copy-to-clipboard --save
</code>

## Props

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
text    | yes| String   |          | Text that is copied when the user clicks 
onClick | no | Function | () => () | Click handler

## Basic usage

`CopyToClipboardButton` uses the [Iconography](/react_base_iconography.html) component.
You will need to add an svg loader:

<code class="pam">
<img src="/styleguide/download.svg" width="16" height="16"/>
npm install babel-loader svg-react-loader --save-dev
</code>

Import the subcomponents:

```
import {CopyToClipboard, CopyToClipboardButton} from 'pui-react-copy-to-clipboard';
```

```react_example_table
<CopyToClipboard text="I got copied by a button"><button className="btn">Click Me To Copy</button></CopyToClipboard>

<CopyToClipboardButton text="I got copied by a good looking button"/>
```

Below is a common example combining a readonly input and a copy button.
Note that there is custom css on the styleguide to get the positioning right.

```
import {Input} from 'pui-react-inputs';
```

```react_example_table
<div className="copy-input">
  <Input label="shareable link" value="bar.com/1234.jpg" readOnly style={{height: "42px"}}/>
  <CopyToClipboardButton text="bar.com/1234.jpg" />
</div>
```
*/
