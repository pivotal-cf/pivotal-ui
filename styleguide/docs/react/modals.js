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

Require the subcomponents:

```
var BaseModal = require('pui-react-modals').BaseModal;
var ModalBody = require('pui-react-modals').ModalBody;
var ModalFooter = require('pui-react-modals').ModalFooter;

// for the example
var DefaultButton = require('pui-react-buttons').DefaultButton;
```

We provide 3 components that can be used to assemble modals:

* `BaseModal`
* `ModalBody`
* `ModalFooter`

**Relevant Properties**

 Property           |  Type         | Description
 -------------      | --------------| --------------------------------------------------------------------------
 `animation`        | Boolean       | Opens and closes the modal widow with sliding and fading animations.
 `size`             | String        | Size variations. Can be `lg`, `large`, `sm`, or `small`.
 `dialogClassName`  | String        | A CSS class to apply to the modal dialog.
 `keyboard`         | Boolean       | Set to false to prevent escape from closing the modal dialog.
 `onEntered`        | Function      | Callback that fires after the modal has finished animating in.
 `onExited`         | Function      | Callback that fires after the modal has finished animating out.
 `onHide`           | Function      | Callback that fires as soon as the modal begins closing.
 `show`             | Boolean       | Whether the modal should be opened or closed.
 `title`            | Node          | Title of the modal, shown at the top of the modal.

**Note**: A modal will be rendered at the end of `body` instead of the DOM node it is given. This makes positioning
work regardless of where you render the modal. One side effect is `ReactDOM.findDOMNode`does not
actually find the modal DOM node.

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
