import React from 'react';
import PropTypes from 'prop-types';
import {Form} from './form';

const hasName = col => col && col.props && col.props.name;
const getFields = children => React.Children.toArray(children).filter(Boolean).reduce((memo, {props: {children}}) => ({
  ...memo,
  ...React.Children.toArray(children).filter(hasName).reduce((memo, {props}) => ({...memo, [props.name]: props}), {})
}), {});

export class GridForm extends React.Component {
  static propTypes = {
    onModified: PropTypes.func,
    onSubmit: PropTypes.func,
    onSubmitError: PropTypes.func,
    afterSubmit: PropTypes.func,
    resetOnSubmit: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {fields: getFields(props.children)};
  }

  shouldComponentUpdate({children}, nextState) {
    nextState.fields = getFields(children);
    return true;
  }

  render() {
    const {children, ...others} = this.props;
    return (
      <Form {...{fields: this.state.fields, ...others, ref: form => this.form = form}}>
        {({fields, ...form}) => React.Children.toArray(children).filter(Boolean).map(row => React.cloneElement(row, {
          ...form, children: React.Children.toArray(row.props.children).filter(Boolean)
            .map(col => React.cloneElement(col, {
              ...form, children: col.props.name ? fields[col.props.name] : col.props.children
            }))
        }))}
      </Form>
    );
  }
}