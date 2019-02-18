---
title: Flyout
reactPath: pivotal-ui/react/flyout
cssPath: pivotal-ui/css/flyout
reactComponents:
- Flyout
---

The flyout appears from the right side of the window and overlays all other content until it is closed. Its
visibility is controlled with the `show` property. It can take a custom `width`. The contents of the header
and the body are set with the `header` and `children` properties, respectively. The behavior of the icon
button is defined through the `onHide` callback.

The flyout will overlay its first parent that has position `relative`.

```jsx
//title=Basic example
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {created, show, disableAnimation} = this.state;

    return (
      <div>
        <Grid>
          <FlexCol fixed>
            <DefaultButton onClick={() => this.setState({show: true})}>
              Open Flyout
            </DefaultButton>
          </FlexCol>
          <FlexCol>
            <FormUnit inline labelPosition="after" label="Disable Animation" hideHelpRow={true}>
              <Toggle size="medium" onChange={() => this.setState({disableAnimation: !disableAnimation})}/>
            </FormUnit>
          </FlexCol>
        </Grid>
        {created && <p className="mtl">Last task created: {created.toLocaleString()}</p>}

        <Flyout {...{
          animationDuration: disableAnimation ? 0 : undefined,
          show,
          header: <h3>Flyout header</h3>,
          headerClassName: 'header-class',
          bodyClassName: 'body-class',
          onHide: () => this.setState({show: false})
        }}>
          <h1>Flyout content</h1>
        </Flyout>
      </div>
    );
  }
}

<Page/>
```

## Props

Property             | Required    | Type        | Default                               | Description
---------------------|-------------|-------------|---------------------------------------|-------------
`animationDuration`  | no          | Number      | 200                                   | Animation duration in milliseconds (Set to <= 0 to disable animations)
`animationEasing`    | no          | String      | cubic-bezier(0.25, 0.46, 0.45, 0.94)  | Animation easing function
`bodyClassName`      | no          | String      |                                       | Class(es) to apply to the body
`children`           | no          | Any         |                                       | Contents of the flyout body
`dialogClassName`    | no          | String      |                                       | Class(es) to apply to the modal dialog
`header`             | no          | Any         |                                       | Contents of the flyout header
`headerClassName`    | no          | String      |                                       | Class(es) to apply to the header
`iconSrc`            | no          | String      | 'close'                               | Icon to use for the close button
`onHide`             | yes         | Function    |                                       | Callback that fires as soon as the modal begins closing
`show`               | no          | Boolean     | false                                 | Whether or not the flyout is visible
`width`              | no          | String      | 480px                                 | Width of flyout content
