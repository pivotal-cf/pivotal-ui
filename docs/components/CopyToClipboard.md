# Copy to clipboard

## Description

The copy to clipboard functionality can be applied to a variety of elements.

## Examples

```jsx
::title=Copy options
<div>
  <CopyToClipboard text="I got copied by a button" tooltip="Good news it's copied">Click Me To Copy</CopyToClipboard>
  <br />
  <CopyToClipboard text="I got copied by a button">
    <DefaultButton {...{
     flat: true,
     iconOnly: true,
     icon: <Icon src="copy"/>
    }}/>
  </CopyToClipboard>
  <br />
  <CopyToClipboard text="I got copied by a button">
    <DefaultButton {...{
      flat: true
    }}>Click Me To Copy</DefaultButton>
  </CopyToClipboard>
</div>
```

### Readonly Input and Copy Button

Below is a common example combining a readonly input and a copy button.
Note that there is custom css on the styleguide to get the positioning right.

```
import {Input} from 'pivotal-ui/react/inputs';
import {DefaultButton} from 'pivotal-ui/react/buttons';
```

```jsx
::title=Link copy
<div className="copy-input">
  <Input label="shareable link" value="bar.com/1234.jpg" readOnly style={{height: "42px"}}/>
  <CopyToClipboard text="bar.com/1234.jpg">
    <DefaultButton {...{
      flat: true,
      iconOnly: true,
      icon: <Icon src="copy"/>
    }} />
  </CopyToClipboard>
</div>
```

## Installation & Usage

#### React
`npm install pivotal-ui --save`

`import {CopyToClipboard} from 'pivotal-ui/react/copy-to-clipboard';`


## Props
Property | Required | Type     | Default  | Description
---------|----------|----------|----------|------------
text     | yes      | String   |          | Text that is copied when the user clicks
onClick  | no       | Function | () => () | Click handler
tooltip  | no       | String   | "Copied" | Text to show in tooltip after click