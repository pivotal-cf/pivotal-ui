# Tooltips

## Description

## Props

## Basic Usage

```jsx
<div>
  <p>
    Check out this
    <OverlayTrigger placement="left" overlay={<Tooltip>I should be on the left</Tooltip>}>
      <span className="overlay-trigger" tabIndex="0"> tooltip on the left.</span>
    </OverlayTrigger>
  </p>
  <p>
    Check out this
    <OverlayTrigger placement="right" overlay={<Tooltip>I should be on the right</Tooltip>}>
      <span className="overlay-trigger" tabIndex="0"> tooltip on the right.</span>
    </OverlayTrigger>
  </p>
  <p>
    Check out this
    <OverlayTrigger placement="top" overlay={<Tooltip>I should be on the top</Tooltip>}>
      <span className="overlay-trigger" tabIndex="0"> tooltip on the top.</span>
    </OverlayTrigger>
  </p>
  <p>
    Check out this
    <OverlayTrigger placement="bottom" overlay={<Tooltip>I should be on the bottom</Tooltip>}>
      <span className="overlay-trigger" tabIndex="0"> tooltip on the bottom.</span>
    </OverlayTrigger>
  </p>
</div>
```