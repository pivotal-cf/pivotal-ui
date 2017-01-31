# Modals

## Description

## Props

## Basic Usage

```jsx
::title=Basic Example
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
        <BaseModal title='What a Header!'
                   className='optional-custom-class'
                   show={this.state.modalOpen}
                   onHide={() => this.setState({modalOpen: false})}>
          <ModalBody>Text in a body</ModalBody>
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

<div>
    <MyModal />
</div>
```