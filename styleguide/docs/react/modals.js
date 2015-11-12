/*doc
---
title: Modals
name: modal_react
categories:
 - react_components_modals
 - react_all
---

<code class="pam">
<i class="fa fa-download" alt="Install the Component">
npm install pui-react-modals --save
</i>
</code>

For the example, you also need to install [Buttons](#button_react) and require `DefaultButton` from it.

Require the subcomponent:

```
var Modal = require('pui-react-modals').Modal;
var ModalBody = require('pui-react-modals').ModalBody;
var ModalFooter = require('pui-react-modals').ModalFooter;
```

We provide 3 components that can be used to assemble modals:

* `Modal`
* `ModalBody`
* `ModalFooter`

<div class="alert alert-info mbxl">
  <h5 class="em-high mtn">
    Opening and closing the modal with callbacks
  </h5>
  <p>
    Modals will be closed by default. To open the modal, add a <code>ref</code>
    property to the modal (i.e. <code>ref='myModal'</code>). Trigger
    <code>this.refs.myModal.open();</code> to open the modal, and
    <code>this.refs.myModal.close();</code> to close the modal.
  </p>
</div>

There are 4 ways to close the modal

* Clicking the "x" button
* Clicking on the modal backdrop
* Clicking the esc key
* Doing any action that triggers `this.refs.myModal.close`.

```jsx_example

var MyModal = React.createClass({
  _openModal: function(){
    this.refs.modal.open();
  },

  _closeModal: function() {
    this.refs.modal.close();
  },

  render: function() {
    return (
      <div>
        <DefaultButton id='openButton' onClick={this._openModal}>
          Open Modal
        </DefaultButton>
        <Modal title='What a Header!' ref='modal' className='optional-custom-class'>
          <ModalBody>Text in a body</ModalBody>
          <ModalFooter>
            <DefaultButton id='closeButton' onClick={this._closeModal}>
              Close
            </DefaultButton>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
});

```

```react_example_table
<MyModal/>
```
*/

/*doc
 ---
 title: Stateless Modal
 name: modal_react_stateless
 parent: modal_react
 ---

 You can use the stateless `BaseModal`. It takes the same properties as modal, plus two extra:


 `show`: a boolean; whether the modal should be opened or closed


 `onHide`: a function; called when the modal receives an event that would normally cause it to close



 Here's the same example as above, but implemented with `BaseModal`

 ```jsx_example

 var MyOtherModal = React.createClass({
   getInitialState: function() {
     return {
       modalOpen: false
     };
   },
   _openModal: function(){
     this.setState({modalOpen: true});
   },

   _closeModal: function() {
     this.setState({modalOpen: false});
   },

   render: function() {
     return (
       <div>
         <DefaultButton id='openStatelessModal' onClick={this._openModal}>
           Open Stateless Modal
         </DefaultButton>
         <BaseModal title='What a Header!'
                    className='optional-custom-class'
                    show={this.state.modalOpen}
                    onHide={this._closeModal}>
           <ModalBody>Text in a body</ModalBody>
           <ModalFooter>
             <DefaultButton id='closeStatelessModal' onClick={this._closeModal}>
               Close
             </DefaultButton>
           </ModalFooter>
         </BaseModal>
       </div>
     );
   }
 });

 ```

 ```react_example_table
 <MyOtherModal/>
 ```
 */
