# Portals

## Description

## Props

## Basic Usage

```jsx_example
<div>
  <section>
    <span>Content will be transported from here:</span>
    <PortalSource name="modal">Transported content</PortalSource>
  </section>
  <section className="mvxxl">Unrelated content</section>
  <section>
    <span>To here:</span>
    <PortalDestination name="modal"/>
  </section>
</div>
```