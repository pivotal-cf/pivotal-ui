# Copy To Clipboard

## Installation & Usage

#### React
`npm install pui-react-copy-to-clipboard --save`

#### CSS Only
`npm install pui-css-copy-to-clipboard --save`

## Description
Some description.

## Basic Usage

`CopyToClipboardButton` uses the [Iconography](/react_base_iconography.html) component.
You will need to add an svg loader:

<code class="pam">
<img src="/styleguide/download.svg" width="16" height="16"/>
npm install babel-loader react-svg-loader --save-dev
</code>

Import the subcomponents:

```
import {CopyToClipboard, CopyToClipboardButton} from 'pui-react-copy-to-clipboard';
```

Some kind of example table
```jsx
::title=Copy Options
<div>
  <CopyToClipboard text="I got copied by a button"><button className="btn">Click Me To Copy</button></CopyToClipboard>
  <CopyToClipboardButton text="I got copied by a good looking button"/>
</div>
```


Below is a common example combining a readonly input and a copy button.
Note that there is custom css on the styleguide to get the positioning right.

```
import {Input} from 'pui-react-inputs';
```

```jsx
::title=Link Copy
<div className="copy-input">
  <Input label="shareable link" value="bar.com/1234.jpg" readOnly style={{height: "42px"}}/>
  <CopyToClipboardButton text="bar.com/1234.jpg" />
</div>
```

## Props
Property | Required | Type | Default | Description
---------|----------|------|---------|------------
text    | yes| String   |          | Text that is copied when the user clicks 
onClick | no | Function | () => () | Click handler
