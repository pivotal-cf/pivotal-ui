---
title: Theme provider
cssPath: pivotal-ui/css/theme-context
reactPath: pivotal-ui/react/theme-context
reactComponents:
- ThemeProvider
---

The `ThemeProvider` component will make all buttons anywhere inside of the `ThemeProvider` use the associated theme without needing to set the `onDark` prop. **Note that as of now this is only detected by Button components.**

```jsx
//title=Using a dark ThemeProvider
<div className="bg-dark-gray pal">
  <ThemeProvider theme="dark">
    <PrimaryButton>Primary Button</PrimaryButton>
    <DefaultButton>Default Button</DefaultButton>
    <DangerButton>Danger Button</DangerButton>
    <BrandButton>Brand Button</BrandButton>
  </ThemeProvider>
</div>
```

```jsx
//title=Using a light ThemeProvider
<div className="bg-light-gray pal">
  <ThemeProvider theme="light">
    <PrimaryButton>Primary Button</PrimaryButton>
    <DefaultButton>Default Button</DefaultButton>
    <DangerButton>Danger Button</DangerButton>
    <BrandButton>Brand Button</BrandButton>
  </ThemeProvider>
</div>
```


## Props

Property    | Required | Type                     | Default | Description
------------|----------|--------------------------|---------|------------
`theme`     | false    | oneOf(['light', 'dark']) | 'light' | The theme all children components should adhere to.
