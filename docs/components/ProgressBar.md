---
title: Progress Bars
cssPath: pivotal-ui/css/progress-bar
reactPath: pivotal-ui/react/progress-bar
reactComponents:
  ProgressBar:
    barClassName: Class(es) to apply
    value: Percentage to display
---

# Overview

# Examples

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