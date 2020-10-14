# Progress bars

## Examples

```jsx
<div>
  <div>Downloading...</div>
  <ProgressBar value={60} barClassName='bar-class' />
  <Grid>
    <FlexCol>60 MB / 100 MB</FlexCol>
    <FlexCol fixed>60%</FlexCol>
  </Grid>
</div>
```

## Installation & Usage

`npm install pivotal-ui --save`

`import {ProgressBar} from 'pivotal-ui/react/progress-bar'`

#### CSS Only
`npm install pivotal-ui --save`

`import * as ProgressBar from 'pivotal-ui/css/progress-bar';`


## Props

Property        | Required   | Type      | Default   | Description
--------------- | ---------- | --------- | --------- | ------------
barClassName    | false      | String    |           | Class(es) to apply
value           | false      | Number    |           | Percentage to display
