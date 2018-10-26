import React from 'react';
import PropTypes from 'prop-types';
import {Dropdown} from '../dropdowns';
import {Checkbox} from '../checkbox';
import classnames from 'classnames';

function doNothing() {
}

export class CheckboxDropdown extends React.Component {
  static propTypes = {
    buttonAriaLabel: PropTypes.string,
    buttonClassName: PropTypes.string,
    flat: PropTypes.bool,
    labelAriaLabel: PropTypes.string,
    onChange: PropTypes.func,
    size: PropTypes.oneOf(['normal', 'large', 'small']),
    split: PropTypes.bool,
    labels: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  };

  static defaultProps = {
    onChange: doNothing,
    size: 'normal'
  };

  constructor(props, context) {
    super(props, context);
    const {labels} = this.props;
    let options = labels;
    if (Array.isArray(labels) === true) {
      options = labels.reduce((result, item) => {
        result[item] = true;
        return result;
      }, {});
    }
    this.state = {open: false, options};
  }

  componentDidMount() {
    require('../../css/checkbox-dropdown');

    const {onChange} = this.props;
    const {options} = this.state;
    onChange(options);
  }

  getTitle() {
    if (this.allSelected()) return 'ALL';
    const {options} = this.state;
    const selectedOptions = Object.keys(options).filter(key => options[key]).join(', ');
    if (!selectedOptions) return 'NONE';
    return selectedOptions;
  }

  allSelected() {
    const {options} = this.state;
    return Object.values(options).every(val => val);
  }

  toggleAll(e) {
    e.stopPropagation();
    const {options} = this.state;
    const toggledVal = !this.allSelected();
    Object.keys(options).forEach(key => options[key] = toggledVal);
    this.setState({options});
    const {onChange} = this.props;
    onChange(options);
  }

  toggleOption(e, key) {
    e.stopPropagation();
    const {options} = this.state;
    options[key] = !options[key];
    this.setState({options});
    const {onChange} = this.props;
    onChange(options);
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const {labels, onChange, className, ...dropDownProps} = this.props;
    const {options} = this.state;

    const dropdownItems = Object.entries(options).map(([label, checked]) => {

      return (
        <Checkbox className="checkbox-dropdown-item-checkbox man"
                  labelClassName="pui-checkbox-dropdown-item-label"
                  key={label}
                  checked={checked}
                  onChange={doNothing}
                  onClick={e => this.toggleOption(e, label)}>{label}</Checkbox>
      );
    });

    const checkBoxAllProps = {
      className: 'checkbox-dropdown-item-checkbox all-checkbox man',
      labelClassName: 'pui-checkbox-dropdown-item-label',
      checked: this.allSelected(),
      onClick: e => this.toggleAll(e),
      onChange: doNothing
    };

    const title = <span className="type-ellipsis">{this.getTitle()}</span>;

    return (
      <Dropdown {...{
        ...dropDownProps,
        title,
        closeOnMenuClick: false,
        className: classnames('checkbox-dropdown', className)
      }}>
        <Checkbox {...checkBoxAllProps}>ALL</Checkbox>
        {dropdownItems}
      </Dropdown>
    );
  }
}

