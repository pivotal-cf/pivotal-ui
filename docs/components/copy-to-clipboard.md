---
title: Copy to clipboard
cssPath: pivotal-ui/css/copy-to-clipboard
reactPath: pivotal-ui/react/copy-to-clipboard
reactComponents:
- CopyToClipboard
---

The copy to clipboard functionality can be applied to a variety of elements.

```jsx
//title=Copy options
<div>
  <CopyToClipboard text="I got copied by a link" tooltip="Good news, it's copied!">Click Me To Copy</CopyToClipboard>
  <br/>
  <CopyToClipboard text="I got copied by an icon button">
    <DefaultButton {...{
     flat: true,
     iconOnly: true,
     icon: <Icon src="copy"/>
    }}/>
  </CopyToClipboard>
  <br/>
  <CopyToClipboard text="I got copied by a button">
    <DefaultButton {...{
      flat: true,
      alt: true
    }}>Click Me To Copy</DefaultButton>
  </CopyToClipboard>
</div>;
```

```jsx
//title=Readonly input and copy button
<div className="copy-input grid">
  <Input label="Shareable Link" value="bar.com/1234.jpg" readOnly className="col"/>
  <div className="col">
    <CopyToClipboard text="bar.com/1234.jpg">
      <PrimaryButton {...{
        iconOnly: true,
        icon: <Icon src="copy"/>
      }}/>
    </CopyToClipboard>
  </div>
</div>;
```

## Props

Property  | Required | Type     | Default  | Description
----------|----------|----------|----------|------------
`onClick` | no       | Function | () => () | Click handler
`text`    | yes      | String   |          | Text that is copied when the user clicks
`tooltip` | no       | String   | "Copied" | Text to show in tooltip after click
