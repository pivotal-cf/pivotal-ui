---
title: Flyout
menu: components
cssPath: pivotal-ui/css/flyout
reactPath: pivotal-ui/react/flyout
reactComponents:
  Flyout:
    animationDuration: Animation duration in milliseconds (Set to <= 0 to disable animations)
    animationEasing: Animation easing function
    bodyClassName: Class(es) to apply to the body
    buttonAriaLabel: ARIA label to give to icon button
    children: Contents of the flyout body
    dialogClassName: Class(es) to apply to the modal dialog
    header: Contents of the flyout header
    headerClassName: Class(es) to apply to the header
    iconSrc: Icon to use for the close button
    onHide: Callback that fires as soon as the modal begins closing
    show: Whether or not the flyout is visible width Width of flyout content
    width: Width of flyout content
---

# Overview

The flyout appears from the right side of the window and overlays all other content until it is closed. Its
visibility is controlled with the `show` property. It can take a custom `width`. The contents of the header
and the body are set with the `header` and `children` properties, respectively. The behavior of the icon
button is defined through the `onHide` callback.

The flyout will overlay its first parent that has position `relative`.

# Examples

```jsx
::title=Basic example
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {created, show, disableAnimation} = this.state;

    const children = (
      <Form>
        <FormRow>
          <FormCol name="name" label="Task Name">
            <Input placeholder="Enter Task Name"/>
          </FormCol>
        </FormRow>
        <FormRow>
          <FormCol className="txt-r">
            <div>
              <DefaultButton alt onClick={() => this.setState({show: false})}>Cancel</DefaultButton>
              <DefaultButton onClick={() => this.setState({created: new Date(), show: false})}>Create</DefaultButton>
            </div>
          </FormCol>
        </FormRow>
      </Form>
    );

    return (
      <div>
        <Form className="man">
          <FormRow>
            <FormCol fixed hideHelpRow={true}>
              <DefaultButton onClick={() => this.setState({show: true})}>
                Open Flyout
              </DefaultButton>
            </FormCol>
            <FormCol inline labelPosition="after" label="Disable Animation" hideHelpRow={true}>
              <Toggle size="medium" onChange={() => this.setState({disableAnimation: !this.state.disableAnimation})}/>
            </FormCol>
          </FormRow>
        </Form>
        {created && <p className="mtl">Last task created: {created.toLocaleString()}</p>}

        <Flyout {...{
          animationDuration: this.state.disableAnimation ? 0 : undefined,
          show,
          header: <h3>Create Task</h3>,
          headerClassName: 'header-class',
          bodyClassName: 'body-class',
          children,
          onHide: () => this.setState({show: false})
        }}/>
      </div>
    );
  }
}

<Page/>
```