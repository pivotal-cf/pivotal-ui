---
title: Modal
cssPath: pivotal-ui/css/modal
reactPath: pivotal-ui/react/modal
reactComponents:
  - Modal
---

# Overview

The `Modal` component provides a way to put content in a pop-up dialog that must be closed before interacting with
the main content again.

# Examples

```jsx-only
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

## Props

| Property          | Required   | Type                                                                                         | Default                              | Description                                                            |
| ----------------  | ---------- | ----------                                                                                   | ----------                           | ------------                                                           |
| animationDuration | no         | Number                                                                                       | 300                                  | Animation duration in milliseconds (Set to <= 0 to disable animations) |
| animationEasing   | no         | String                                                                                       | cubic-bezier(0.25, 0.46, 0.45, 0.94) | Animation easing function                                              |
| dialogClassName   | no         | String                                                                                       |                                      | Class(es) to apply to the modal dialog                                 |
| onHide            | yes        | Function                                                                                     |                                      | Callback that fires as soon as the modal begins closing                |
| size              | no         | String, oneOf(['sm', 'small', 'large', 'lg']) or a valid css width value, eg. '44%', '900px' |                                      | Size variations                                                        |
| show              | no         | Boolean                                                                                      |                                      | Whether the modal should be opened or closed                           |
| title             | no         | Node                                                                                         |                                      | Title of the modal, shown at the top of the modal                      |
