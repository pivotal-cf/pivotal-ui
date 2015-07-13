var React = require('react');

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
var Dropdown = require('react-bootstrap').DropdownButton;

function defDropdown(props) {
  return React.createClass({
    render() {
      return <Dropdown {...props} {...this.props}/>;
    }
  });
}
module.exports = {
  Dropdown,

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
