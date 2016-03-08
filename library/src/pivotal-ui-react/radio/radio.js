var React = require('react');
import {mergeProps} from 'pui-react-helpers';
import 'pui-css-forms';

class Radio extends React.Component {
  static propTypes = {
    checked: React.PropTypes.bool,
    defaultChecked: React.PropTypes.bool,
    name: React.PropTypes.string,
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
    id: React.PropTypes.string,
    className: React.PropTypes.string,
    style: React.PropTypes.object,
    disabled: React.PropTypes.bool
  };

  render() {
    const {className, style, children, disabled, ...others} = this.props;
    const props = mergeProps({className: className, style: style}, {className: 'radio'});

    return (
      <div {...props}>
        <label className={disabled ? 'disabled' : ''}>
          <input type="radio" disabled={disabled} aria-disabled={disabled} {...others} />
          {children}
        </label>
      </div>
    );
  }
}

class RadioGroup extends React.Component {
  static propTypes = {
    id: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func
  };

  render() {
    var {name, children, onChange, ...others} = this.props;

    children = React.Children.map(children,
      (child) => React.cloneElement(child, {name, onChange: onChange})
    );

    var props = mergeProps(others, {className: 'radio-group'});

    return <div {...props} >{children}</div>;
  }
}

module.exports = {Radio, RadioGroup};
