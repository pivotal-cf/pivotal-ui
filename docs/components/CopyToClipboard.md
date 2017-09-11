# Copy to clipboard

## Description

`CopyToClipboardButton` uses the [Iconography](/react_base_iconography.html) component.
You will need to add an svg loader:

<code class="pam">
<img src="/styleguide/download.svg" width="16" height="16"/>
npm install babel-loader react-svg-loader --save-dev
</code>

## Examples

```jsx
::title=Copy options
<div>
  <CopyToClipboard text="I got copied by a button"><button className="btn">Click Me To Copy</button></CopyToClipboard>
  <CopyToClipboardButton text="I got copied by a good looking button"/>
</div>
```

### Readonly Input and Copy Button

Below is a common example combining a readonly input and a copy button.
Note that there is custom css on the styleguide to get the positioning right.

```
import {Input} from 'pivotal-ui/react/inputs';
```

```jsx
::title=Link copy
<div className="copy-input">
  <Input label="shareable link" value="bar.com/1234.jpg" readOnly style={{height: "42px"}}/>
  <CopyToClipboardButton text="bar.com/1234.jpg" />
</div>
```

## Installation & Usage

#### React
`npm install pivotal-ui --save`

`import {CopyToClipboard, CopyToClipboardButton} from 'pivotal-ui/react/copy-to-clipboard';`

#### CSS Only
`npm install pivotal-ui --save`

`import * as CopyToClipboard from 'pivotal-ui/css/copy-to-clipboard';`


## Props
Property | Required | Type     | Default  | Description
---------|----------|----------|----------|------------
text     | yes      | String   |          | Text that is copied when the user clicks
onClick  | no       | Function | () => () | Click handler
large    | no       | Boolean  | false    | Make button large
small    | no       | Boolean  | false    | Make button small