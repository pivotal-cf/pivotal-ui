# Grids

## Description
Grid description.

## Basic Example

```jsx
::title=Basic Example
<div>
  <Row className="grid-show">
    <Col md={2}></Col>
    <Col md={2}></Col>
    <Col md={2}></Col>
    <Col md={2}></Col>
    <Col md={2}></Col>
    <Col md={2}></Col>
    <Col md={2}></Col>
    <Col md={2}></Col>
    <Col md={2}></Col>
    <Col md={2}></Col>
    <Col md={2}></Col>
    <Col md={2}></Col>
  </Row>

  <Row className="grid-show">
    <Col md={16}></Col>
    <Col md={8}></Col>
  </Row>

  <Row className="grid-show">
    <Col md={8}></Col>
    <Col md={8}></Col>
    <Col md={8}></Col>
  </Row>

  <Row className="grid-show">
    <Col md={12}></Col>
    <Col md={12}></Col>
  </Row>
</div>
```
## Mobile and Desktop

Don't want your columns to simply stack in smaller devices?
Use the extra small and medium device grid classes by adding `.col-xs-*` `.col-md-*` to your columns.
See the example below for a better idea of how it all works.

```jsx
::title=Example
<div>
  <Row className="grid-show">
    <Col xs={24} md={16}/>
    <Col xs={12} md={8}/>
  </Row>
  <Row className="grid-show">
    <Col xs={12} md={8}/>
    <Col xs={12} md={8}/>
    <Col xs={12} md={8}/>
  </Row>
  <Row className="grid-show">
    <Col xs={12}/>
    <Col xs={12}/>
  </Row>
</div>
```

## Gutter Sizes

```jsx
::title=Example
<div>
  <Row className="grid-show">
    <Col md={12}/>
    <Col md={12}/>
  </Row>
  <Row className="grid-show" gutter="md">
    <Col md={12}/>
    <Col md={12}/>
  </Row>
  <Row className="grid-show" gutter="sm">
    <Col md={12}/>
    <Col md={12}/>
  </Row>
</div>
```

## Props

Row properties:

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
componentClass | no | Node                    | div  | The component to render the row
gutter         | no | oneOf('sm', 'md', 'lg') | 'lg' | Sets the size of the gutter

Col Properties

Property | Required | Type | Default | Description
---------|----------|------|---------|------------
componentClass                         | no | Node    | div | The component to render the row
xs, sm, md, lg                         | no | Number  |     | Width of the column (out of 24) at the xs, sm, md, or lg screen width
xsHidden, smHidden, mdHidden, lgHidden | no | Boolean |     | If true, hide the column at the relevant screen width
xsOffset, smOffset, mdOffset, lgOffset | no | Number  |     | Offset of the column (out of 24)
xsPush, smPush, mdPush, lgPush         | no | Number  |     | Offset to change the order of grid columns to the right with
xsPull, smPull, mdPull, lgPull         | no | Number  |     | Offset to change the order of grid columns to the left with

# Flex Grid