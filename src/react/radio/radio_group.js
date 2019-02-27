import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export class RadioGroup extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.any
  };

  componentDidMount() {
    require('../../css/forms');
  }

  render() {
    const {name, children, onChange, className, value, ...others} = this.props;
    const radioProps = onChange ? {name, onChange} : {name, readOnly: true};

    return (
      <div {...{...others, className: classnames('pui-radio-group', className)}}>
        {React.Children.map(children, child =>
          React.cloneElement(child, {...radioProps, checked: child.props.value === value}))}
      </div>
    );
  }
}
