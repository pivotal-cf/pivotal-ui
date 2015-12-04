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
var BaseModal = require('pui-react-modals').BaseModal;
var ModalBody = require('pui-react-modals').ModalBody;
var ModalFooter = require('pui-react-modals').ModalFooter;
```

We provide 3 components that can be used to assemble modals:

* `BaseModal`
* `ModalBody`
* `ModalFooter`

Relevant Properties:

 `show`: a boolean; whether the modal should be opened or closed

 `onHide`: a function; called when the modal is signaled to close in one of these ways:

 * Clicking the "x" button
 * Clicking on the modal backdrop
 * Clicking the esc key

 ```jsx_example

 var MyModal = React.createClass({
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
         <DefaultButton onClick={this._openModal}>
           Open Stateless Modal
         </DefaultButton>
         <BaseModal title='What a Header!'
                    className='optional-custom-class'
                    show={this.state.modalOpen}
                    onHide={this._closeModal}>
           <ModalBody>Text in a body</ModalBody>
           <ModalFooter>
             <DefaultButton onClick={this._closeModal}>
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
 <MyModal/>
 ```
*/
