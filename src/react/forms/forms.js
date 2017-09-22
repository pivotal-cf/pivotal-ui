import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {Icon} from "../iconography/iconography";

const noop = () => {
};

export class Form extends React.Component {
  static propTypes = {
    rows: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired,
    submissionErrorHandler: PropTypes.func.isRequired
  };

  static defaultProps = {
    rows: [[]],
    onSubmit: noop,
    submissionErrorHandler: noop
  };

  constructor(props) {
    super(props);
    this.state = {errors: {}};
  }

  componentDidMount() {
    require('../../css/forms');
  }

  render() {
    const {rows, onSubmit, submissionErrorHandler} = this.props;
    const {errors} = this.state;

    return (
      <form {...{
        onSubmit: e => {
          e.preventDefault();
          try {
            onSubmit();
          } catch (e) {
            this.setState({errors: submissionErrorHandler(e)})
          }
        }
      }}>
        {rows.map((cols, row) => (
          <div {...{className: 'grid', key: row}}>
            {cols.map(({name, label, field, inline, className}, col) => (
              <div {...{className: classnames('col', className), key: col}}>
                <div {...{
                  className: classnames('form-group', {
                    'has-error': errors[name],
                    'form-inline': inline
                  })
                }}>
                  {label && <label>{label}</label>}
                  {field}
                  {errors[name] &&
                  <Icon src="close_circle_outline" className="invalid"/>}
                  {errors[name] &&
                  <div className="help-block">{errors[name]}</div>}
                </div>
              </div>
            ))}</div>
        ))}
      </form>
    );
  }
}