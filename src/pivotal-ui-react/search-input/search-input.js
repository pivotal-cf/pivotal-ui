var React = require('react');
var types = React.PropTypes;
import {mergeProps} from 'pui-react-helpers';

/**
 * @component SearchInput
 * @description A text input for inputting search queries
 *
 * @example ```js
 * var SearchInput = require('pui-react-search-input').SearchInput;
 * var MyComponent = React.createClass({
 *   render() {
 *     return <SearchInput name="query" placeholder="Search this site"/>;
 *   }
 * });
 * ```
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react.html#form_search_input_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/forms.html#04_form_search_input)
 */
var SearchInput = React.createClass({
  propTypes: {
    placeholder: types.string
  },

  render: function() {
    const props = mergeProps(this.props, {className: 'form-control', type: 'text'});
    return (
      <div className="form-group form-group-search">
        <input {...props}/>
        <i className="fa fa-search"/>
      </div>
    );
  }
});

module.exports = {SearchInput};
