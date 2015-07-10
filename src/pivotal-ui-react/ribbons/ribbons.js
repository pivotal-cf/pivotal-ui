var React = require('react');
import {mergeProps} from 'pui-react-helpers';

/**
 * @component Ribbon
 * @description Flashy text used to call out access, status, environment, etc.
 *
 * @example ```js
 * var Ribbon = require('pui-react-ribbons').Ribbon;
 * var MyComponent = React.createClass({
 *   render() {
 *     return <Ribbon>Acceptance Environment</Ribbon>
 *   }
 * });
 * ```
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react_beta.html#ribbons_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#ribbon)
 */
var Ribbon = React.createClass({
  render() {
    var {children, ...others} = this.props;
    var props = mergeProps(others, {className: 'inline-ribbon'});
    return <div {...props}>{children}</div>;
  }
});

/**
 * @component PrimaryRibbon
 * @description A `<Ribbon>` with an emphasized background color
 *
 * @example ```js
 * var PrimaryRibbon = require('pui-react-ribbons').PrimaryRibbon;
 * var MyComponent = React.createClass({
 *   render() {
 *     return <PrimaryRibbon>Acceptance Environment</PrimaryRibbon>
 *   }
 * });
 * ```
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react_beta.html#ribbons_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#ribbon)
 */
var PrimaryRibbon = React.createClass({
  render() {
    var {children, ...others} = this.props;
    var props = mergeProps(others, {className: ['inline-ribbon', 'ribbon-primary']});
    return <div {...props}>{children}</div>;
  }
});

/**
 * @component Banner
 * @description A larger, emphasized `<Ribbon>`
 *
 * @example ```js
 * var Banner = require('pui-react-ribbons').Banner;
 * var MyComponent = React.createClass({
 *   render() {
 *     return <Banner>Acceptance Environment</Banner>
 *   }
 * });
 * ```
 *
 * @see [Pivotal UI React](http://styleguide.pivotal.io/react_beta.html#ribbons_react)
 * @see [Pivotal UI CSS](http://styleguide.pivotal.io/elements.html#ribbon)
 */
var Banner = React.createClass({
  render() {
    var {children, ...others} = this.props;
    var props = mergeProps(others, {className: 'ribbon-banner'});
    return <div {...props}>{children}</div>;
  }
});

module.exports = {Ribbon, PrimaryRibbon, Banner};
