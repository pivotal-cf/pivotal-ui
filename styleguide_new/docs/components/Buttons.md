# Buttons

## Basic Usage

```jsx
::title=Default Button
<DefaultButton>
  yo
</DefaultButton>
```

```jsx
::title=Primary Button
<PrimaryButton>
  hello world
</PrimaryButton>
```

```jsx
::title=Danger Button
<DangerButton>
  Danger
</DangerButton>
```

```jsx
::title=Brand Button
<BrandButton>
  Brand
</BrandButton>
```

## Props

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
alt   | no | Boolean                                        | false     | Whether to render as 'alternate' button
flat  | no | Boolean                                        | false     | Whether to render as a 'flat' button
href  | no | String                                         |           | If specified, button clicks will redirect to this href
large | no | Boolean                                        | false     | Whether to render the button large
small | no | Boolean                                        | false     | Whether to render teh button small