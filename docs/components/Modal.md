---
title: Modal
menu: components
cssPath: pivotal-ui/css/modal
reactPath: pivotal-ui/react/modal
reactComponents:
  Modal:
    animationDuration: Animation duration in milliseconds (Set to <= 0 to disable animations) |
    animationEasing: Animation easing function
    bodyClassName: Class(es) to apply to modal body
    children: Content to render in modal body
    dialogClassName: Class(es) to apply to the modal dialog
    footer: Content to render in modal footer
    footerClassName: Class(es) to apply to modal footer
    onHide: Callback that fires as soon as the modal begins closing
    size: Size of modal (can be any CSS width value)
    show: Whether the modal should be opened or closed
    title: Title of the modal, shown at the top of the modal
---

# Overview

The `Modal` component provides a way to put content in a pop-up dialog that must be closed before interacting with
the main content again.

# Examples

```jsx
::title=Basic example with custom size and duration
class MyModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {show: false, disableAnimation: false};
  }

  render() {
    return (
      <div>
        <Form className="mbn">
          <FormRow>
            <FormCol fixed hideHelpRow>
              <DefaultButton onClick={() => this.setState({show: true})}>
                Open Modal
              </DefaultButton>
            </FormCol>
            <FormCol inline hideHelpRow labelPosition="after" label="Disable Animation">
              <Toggle size="medium" onChange={() => this.setState({disableAnimation: !this.state.disableAnimation})}/>
            </FormCol>
          </FormRow>
        </Form>
        <Modal animationDuration={this.state.disableAnimation ? 0 : undefined}
                title='What a Header!'
                size="30%"
                show={this.state.show}
                onHide={() => this.setState({show: false})}
                footer={<DefaultButton onClick={() => this.setState({show: false})}>Close</DefaultButton>}>
          <p>Text in a body</p><Input autoFocus placeholder="Tell me your darkest secrets"/>
        </Modal>
      </div>
    );
  }
}

<MyModal />
```