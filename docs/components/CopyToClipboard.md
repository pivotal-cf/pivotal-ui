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
      flat: true,
      alt: true
    }}>Click Me To Copy</DefaultButton>
  </CopyToClipboard>
</div>
```

```jsx
::title=Readonly input and copy button
<div className="copy-input grid">
  <Input label="Shareable Link" value="bar.com/1234.jpg" readOnly className="col"/>
  <div className="col">
    <CopyToClipboard text="bar.com/1234.jpg" className="mtxxxl">
      <PrimaryButton {...{
        iconOnly: true,
        icon: <Icon src="copy"/>
      }} />
    </CopyToClipboard>
  </div>
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