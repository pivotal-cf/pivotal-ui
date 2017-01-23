# Copy To Clipboard

## Description

## Props

## Basic Usage

```jsx_example
<div>
    <CopyToClipboard text="I got copied by a button"><button>Click Me To Copy</button></CopyToClipboard>
        I got copied by a good looking button
    <CopyToClipboardButton text="I got copied by a good looking button"/>
    <div className="copy-input">
      <Input label="shareable link" value="bar.com/1234.jpg" readOnly />
      <CopyToClipboardButton text="bar.com/1234.jpg" />
    </div>
</div>
```