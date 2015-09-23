var React = require('react');
import classnames from 'classnames';
import uniqueid from 'lodash.uniqueid';

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
var BsDropdown = require('react-bootstrap/lib/Dropdown').default;

function defDropdown(props) {
  return React.createClass({
    propTypes: {
      id: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
      buttonClassName: React.PropTypes.string,
      style: React.PropTypes.any,
      title: React.PropTypes.any,
      border: React.PropTypes.bool
    },
    render: function render() {
      const {buttonClassName, style, title, children, border, ...others} = this.props;
      let {id} = others;
      const {buttonClassName: defaultBtnClassName, bsStyle} = props;

      const btnClass = classnames(buttonClassName, defaultBtnClassName);
      const borderClass = border ? 'dropdown-border' : null;
      if (!id) {
        id = uniqueid('dropdown');
      }
      return (
        <BsDropdown {...others} id={id}>
          <BsDropdown.Toggle className={btnClass} bsStyle={bsStyle} style={style}>
            {title}
          </BsDropdown.Toggle>
          <BsDropdown.Menu className={borderClass}>
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
  DropdownItem: require('react-bootstrap/lib/MenuItem'),

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
 - react_all_dropdowns
 - react_all
---

<code class="pam">
<i class="fa fa-download" alt="Install the Component">
npm install pui-react-dropdowns --save
</i>
</code>

Require the subcomponents:

```
var Dropdown = require('pui-react-dropdowns').Dropdown;
var DropdownItem = require('pui-react-dropdowns').DropdownItem;
var LinkDropdown = require('pui-react-dropdowns').LinkDropdown;
var DefaultAltDropdown = require('pui-react-dropdowns').DefaultAltDropdown;
var LowlightDropdown = require('pui-react-dropdowns').LowlightDropdown;
var DangerDropdown = require('pui-react-dropdowns').DangerDropdown;
var HighlightDropdown = require('pui-react-dropdowns').HighlightDropdown;
var HighlightAltDropdown = require('pui-react-dropdowns').HighlightAltDropdown;
```

This is the basic bootstrap dropdown:

```react_example_table
<Dropdown title='DropDown'>
  <DropdownItem href="http://media.giphy.com/media/13py6c5BSnBkic/giphy.gif">Booyeah</DropdownItem>
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
  <DropdownItem href="http://media.giphy.com/media/TlK63EQERmiAVzMEgO4/giphy.gif">Adorable</DropdownItem>
</DefaultAltDropdown>
```

If you want to add borders between items, you can pass a `border` attribute to any of our Dropdowns.

```react_example
<DefaultAltDropdown title='DropDown' border>
  <DropdownItem href="http://media.giphy.com/media/13py6c5BSnBkic/giphy.gif">Booyeah</DropdownItem>
  <DropdownItem href="http://media.giphy.com/media/TlK63EQERmiAVzMEgO4/giphy.gif">Adorable</DropdownItem>
  <DropdownItem href="http://media.giphy.com/media/13py6c5BSnBkic/giphy.gif">Booyeah</DropdownItem>
  <DropdownItem href="http://media.giphy.com/media/TlK63EQERmiAVzMEgO4/giphy.gif">Adorable</DropdownItem>
</DefaultAltDropdown>
```

If you want to right align the dropdown menu, you can pass a `pullRight` attribute to any of our Dropdowns.

```react_example
<DefaultAltDropdown title='DropDown' pullRight>
  <DropdownItem href="http://media.giphy.com/media/13py6c5BSnBkic/giphy.gif">Booyeah</DropdownItem>
  <DropdownItem href="http://media.giphy.com/media/TlK63EQERmiAVzMEgO4/giphy.gif">Adorable</DropdownItem>
</DefaultAltDropdown>
```

If you want to divide the dropdown menu with dividers, you can pass a `divider` attribute to a DropdownItem.

```react_example
<DefaultAltDropdown title='DropDown'>
  <DropdownItem href="http://media.giphy.com/media/13py6c5BSnBkic/giphy.gif">Booyeah</DropdownItem>
  <DropdownItem href="http://media.giphy.com/media/TlK63EQERmiAVzMEgO4/giphy.gif">Adorable</DropdownItem>
  <DropdownItem href="http://media.giphy.com/media/13py6c5BSnBkic/giphy.gif">Booyeah</DropdownItem>
  <DropdownItem divider></DropdownItem>
  <DropdownItem href="http://media.giphy.com/media/TlK63EQERmiAVzMEgO4/giphy.gif">Adorable</DropdownItem>
  <DropdownItem href="http://media.giphy.com/media/13py6c5BSnBkic/giphy.gif">Booyeah</DropdownItem>
</DefaultAltDropdown>
```

*/
