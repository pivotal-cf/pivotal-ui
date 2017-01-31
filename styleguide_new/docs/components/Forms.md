# Forms

## Description

## Props

## Basic Usage

```jsx
::title=Basic Example
<div>
    <Checkbox label="Label"/>
    <br/>
    <Input label="Label" id="theInput" placeholder="Enter text here if you dare"/>
    <br/>
    <RadioGroup name="field_name">
      <Radio value="firstValue">You could click this radio button</Radio>
      <Radio value="SecondValue" defaultChecked>This is also a radio button</Radio>
      <Radio value="ThirdValue" disabled>This is a disabled radio button</Radio>
    </RadioGroup>
    <br/>
    <Toggle onChange={() => console.log('I have been toggled!')}/>
</div>
```