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
 */
var BsDropdown = require('react-bootstrap/lib/Dropdown');

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
   */
  DropdownItem: require('react-bootstrap/lib/MenuItem'),

  /**
   * @component LinkDropdown
   * @description An alternate style for the dropdown trigger button
   *
   * @property title {String} Sets the text of the dropdown trigger button
   *
   */
  LinkDropdown: defDropdown({bsStyle: 'link'}),

  /**
   * @component DefaultAltDropdown
   * @description An alternate style for the dropdown trigger button
   *
   * @property title {String} Sets the text of the dropdown trigger button
   *
   */
  DefaultAltDropdown: defDropdown({buttonClassName: 'btn-default-alt', bsStyle: null}),

  /**
   * @component LowlightDropdown
   * @description An alternate style for the dropdown trigger button
   *
   * @property title {String} Sets the text of the dropdown trigger button
   *
   */
  LowlightDropdown: defDropdown({buttonClassName: 'btn-lowlight', bsStyle: null}),

  /**
   * @component DangerDropdown
   * @description An alternate style for the dropdown trigger button
   *
   * @property title {String} Sets the text of the dropdown trigger button
   *
   */
  DangerDropdown: defDropdown({bsStyle: 'danger'}),

  /**
   * @component HighlightDropdown
   * @description An alternate style for the dropdown trigger button
   *
   * @property title {String} Sets the text of the dropdown trigger button
   *
   */
  HighlightDropdown: defDropdown({buttonClassName: 'btn-highlight', bsStyle: null}),

  /**
   * @component HighlightAltDropdown
   * @description An alternate style for the dropdown trigger button
   *
   * @property title {String} Sets the text of the dropdown trigger button
   *
   */
  HighlightAltDropdown: defDropdown({buttonClassName: 'btn-highlight-alt', bsStyle: null})
};
