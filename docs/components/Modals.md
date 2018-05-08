# Modals

## Description

We provide 3 components that can be used to assemble modals:

* `BaseModal`
* `ModalBody`
* `ModalFooter`

## Examples

```
import {DefaultButton} from 'pivotal-ui/react/buttons';
import {Input} from 'pivotal-ui/react/inputs';
```

```jsx
::title=Basic example
class MyModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {modalOpen: false};
  }

  render() {
    return (
      <div>
        <DefaultButton onClick={() => this.setState({modalOpen: true})}>
          Open Stateless Modal
        </DefaultButton>
        <BaseModal acquireFocus={false}
                   title='What a Header!'
                   className='optional-custom-class'
                   show={this.state.modalOpen}
                   onHide={() => this.setState({modalOpen: false})}>
          <ModalBody><p>Text in a body</p><Input autoFocus placeholder="Tell me your darkest secrets"/></ModalBody>
          <ModalFooter>
            <DefaultButton onClick={() => this.setState({modalOpen: false})}>
              Close
            </DefaultButton>
          </ModalFooter>
        </BaseModal>
      </div>
    );
  }
}

<MyModal />
```
## Installation & Usage

#### React
`npm install pivotal-ui --save`

`import {BaseModal, ModalBody, ModalFooter} from 'pivotal-ui/react/modals';`

#### CSS Only
`npm install pivotal-ui --save`

`import * as Modals from 'pivotal-ui/css/modals';`

## Props

Property        | Required | Type     | Default  | Description
----------------|----------|----------|----------|------------
acquireFocus    | no       | Boolean  | true     | Acquire focus just before modal `onEntered`
animation       | no       | Boolean  | true     | Opens and closes the modal widow with sliding and fading animations.
dialogClassName | no       | String   |          | A CSS class to apply to the modal dialog
keyboard        | no       | Boolean  | true     | Set to false to prevent escape from closing the modal dialog
onEntered       | no       | Function |          | Callback that fires after the modal has finished animating in
onExited        | no       | Function |          | Callback that fires after the modal has finished animating out
onHide          | no       | Function | () => () | Callback that fires as soon as the modal begins closing
show            | no       | Boolean  |          | Whether the modal should be opened or closed
size            | no       | String, oneOf(['sm', 'small', 'large', 'lg']) or a valid css width value, eg. '44%', '900px', '800pt'| | Size variations
title           | no       | Node     |          | Title of the modal, shown at the top of the modal
