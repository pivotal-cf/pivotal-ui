var React = require('react');
import classnames from 'classnames';

/**
 * @component Dropdown
 * @description A menu that opens when triggered by a button
 *
 * @property title {String} Sets the text of the dropdown trigger button
 *
 * @example ```js
 * var Dropdown = require('pui-react-dropdowns').Dropdown;
 * var DropdownItem = require('pui-react-dropdowns').DropdownItem;
 * var MyComponent = React.createClass({
 *   render() {
 *     return (
 *       <Dropdown title="Click to Open">
 *         <DropdownItem href="https://google.com">Link to Google</DropdownItem>
 *         <DropdownItem divider/>
 *         <DropdownItem href="https://imgur.com">Separated from the first link by horizontal line</DropdownItem>
 *       </Dropdown>
 *     );
 *   }
 * });
 * ```
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#dropdown_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/objects.html#dropdown)
 */
var BsDropdown = require('react-bootstrap').Dropdown;

function defDropdown(props) {
  return React.createClass({
    propTypes: {
      id: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
      buttonClassName: React.PropTypes.string,
      style: React.PropTypes.any,
      title: React.PropTypes.any
    },
    render: function render() {
      const {buttonClassName, style, title, children, ...others} = this.props;
      const {buttonClassName: defaultBtnClassName, bsStyle} = props;

      const btnClass = classnames(buttonClassName, defaultBtnClassName);
      return (
        <BsDropdown {...others}>
          <BsDropdown.Toggle className={btnClass} bsStyle={bsStyle} style={style}>
            {title}
          </BsDropdown.Toggle>
          <BsDropdown.Menu>
            {children}
          </BsDropdown.Menu>
        </BsDropdown>
      );
    }
  });
}

module.exports = {
  Dropdown: defDropdown({}),

  /**
   * @component DropdownItem
   * @description Denotes the elements of a dropdown menu
   *
   * @property href {String} A URL to link to
   * @property divider {Boolean} If set, inserts a horizontal line instead of a link
   *
   * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#dropdown_react)
   * @see [Pivotal UI CSS](http://styleguide.pivotal.io/objects.html#dropdown)
   */
  DropdownItem: require('react-bootstrap').MenuItem,

  /**
   * @component LinkDropdown
   * @description An alternate style for the dropdown trigger button
   *
   * @property title {String} Sets the text of the dropdown trigger button
   *
   * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#dropdown_react)
   * @see [Pivotal UI CSS](http://styleguide.pivotal.io/objects.html#dropdown)
   */
  LinkDropdown: defDropdown({bsStyle: 'link'}),

  /**
   * @component DefaultAltDropdown
   * @description An alternate style for the dropdown trigger button
   *
   * @property title {String} Sets the text of the dropdown trigger button
   *
   * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#dropdown_react)
   * @see [Pivotal UI CSS](http://styleguide.pivotal.io/objects.html#dropdown)
   */
  DefaultAltDropdown: defDropdown({buttonClassName: 'btn-default-alt', bsStyle: null}),

  /**
   * @component PrimaryDropdown
   * @description An alternate style for the dropdown trigger button
   *
   * @property title {String} Sets the text of the dropdown trigger button
   *
   * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#dropdown_react)
   * @see [Pivotal UI CSS](http://styleguide.pivotal.io/objects.html#dropdown)
   */
  PrimaryDropdown: defDropdown({bsStyle: 'primary'}),

  /**
   * @component LowlightDropdown
   * @description An alternate style for the dropdown trigger button
   *
   * @property title {String} Sets the text of the dropdown trigger button
   *
   * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#dropdown_react)
   * @see [Pivotal UI CSS](http://styleguide.pivotal.io/objects.html#dropdown)
   */
  LowlightDropdown: defDropdown({buttonClassName: 'btn-lowlight', bsStyle: null}),

  /**
   * @component DangerDropdown
   * @description An alternate style for the dropdown trigger button
   *
   * @property title {String} Sets the text of the dropdown trigger button
   *
   * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#dropdown_react)
   * @see [Pivotal UI CSS](http://styleguide.pivotal.io/objects.html#dropdown)
   */
  DangerDropdown: defDropdown({bsStyle: 'danger'}),

  /**
   * @component HighlightDropdown
   * @description An alternate style for the dropdown trigger button
   *
   * @property title {String} Sets the text of the dropdown trigger button
   *
   * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#dropdown_react)
   * @see [Pivotal UI CSS](http://styleguide.pivotal.io/objects.html#dropdown)
   */
  HighlightDropdown: defDropdown({buttonClassName: 'btn-highlight', bsStyle: null}),

  /**
   * @component HighlightAltDropdown
   * @description An alternate style for the dropdown trigger button
   *
   * @property title {String} Sets the text of the dropdown trigger button
   *
   * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#dropdown_react)
   * @see [Pivotal UI CSS](http://styleguide.pivotal.io/objects.html#dropdown)
   */
  HighlightAltDropdown: defDropdown({buttonClassName: 'btn-highlight-alt', bsStyle: null})
};


/*doc
---
title: Dropdowns
name: dropdown_react
categories:
- React
---

<code class="pam">
<i class="fa fa-download" alt="Install the Component">
npm install pui-react-dropdowns --save
</i>
</code>

Require the subcomponent:

```
var Dropdown = require('pui-react-dropdowns').Dropdown;
var DropdownItem = require('pui-react-dropdowns').DropdownItem;
```

This is the basic bootstrap dropdown:

```react_example_table
<Dropdown title='DropDown'>
  <DropdownItem href="http://media.giphy.com/media/13py6c5BSnBkic/giphy.gif">Booyeah</DropdownItem>
  <DropdownItem divider />
  <DropdownItem href="http://media.giphy.com/media/TlK63EQERmiAVzMEgO4/giphy.gif">Adorable</DropdownItem>
</Dropdown>
```

Here are all the different dropdown styles:

```react_example_table
<LinkDropdown title='Link'>
  <DropdownItem href="http://media.giphy.com/media/TlK63EQERmiAVzMEgO4/giphy.gif">Adorable</DropdownItem>
</LinkDropdown>

<DefaultAltDropdown title='Default Alt'>
  <DropdownItem href="http://media.giphy.com/media/TlK63EQERmiAVzMEgO4/giphy.gif">Adorable</DropdownItem>
</DefaultAltDropdown>

<PrimaryDropdown title='Primary'>
  <DropdownItem href="http://media.giphy.com/media/TlK63EQERmiAVzMEgO4/giphy.gif">Adorable</DropdownItem>
</PrimaryDropdown>

<LowlightDropdown title='Lowlight'>
  <DropdownItem href="http://media.giphy.com/media/TlK63EQERmiAVzMEgO4/giphy.gif">Adorable</DropdownItem>
</LowlightDropdown>

<DangerDropdown title='Danger'>
  <DropdownItem href="http://media.giphy.com/media/TlK63EQERmiAVzMEgO4/giphy.gif">Adorable</DropdownItem>
</DangerDropdown>

<HighlightDropdown title='Highlight'>
  <DropdownItem href="http://media.giphy.com/media/TlK63EQERmiAVzMEgO4/giphy.gif">Adorable</DropdownItem>
</HighlightDropdown>

<HighlightAltDropdown title='Highlight Alt'>
  <DropdownItem href="http://media.giphy.com/media/TlK63EQERmiAVzMEgO4/giphy.gif">Adorable</DropdownItem>
</HighlightAltDropdown>
```

If you want to customize the dropdown, you can use `className` to add a modifier class to the `btn-group`.

To customize the dropdown button, you can add modifier classes to it
using the `buttonClassName` property. `id` and `style` will also be applied to the dropdown button.

```react_example
<DefaultAltDropdown title='DropDown' buttonClassName='btn-lg'>
  <DropdownItem href="http://media.giphy.com/media/13py6c5BSnBkic/giphy.gif">Booyeah</DropdownItem>
  <DropdownItem divider />
  <DropdownItem href="http://media.giphy.com/media/TlK63EQERmiAVzMEgO4/giphy.gif">Adorable</DropdownItem>
</DefaultAltDropdown>
```

*/
