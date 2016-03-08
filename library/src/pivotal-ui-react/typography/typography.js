const React = require('react');
import {mergeProps} from 'pui-react-helpers';
import 'pui-css-typography';

class Heading extends React.Component {
  static propTypes = {
    allCaps: React.PropTypes.bool,
    bold: React.PropTypes.oneOf(['low', 'default', 'high', 'max']),
    color: React.PropTypes.string,
    element: React.PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p']),
    size: React.PropTypes.oneOf(['title', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'small'])
  };

  render() {
    var {size, bold, allCaps, color, element = 'p', children, ...other} = this.props;

    var classes = [
      size,
      bold && `em-${bold}`,
      allCaps && 'em-alt',
      color
    ]
      .filter(Boolean)
      .join(' ');

    const props = mergeProps(other, {className: classes});
    var Klass = element;
    return <Klass {...props}>{children}</Klass>;
  }
}

function defHeader(props) {
  return class extends React.Component {
    static propTypes = {
      allCaps: React.PropTypes.bool,
      bold: React.PropTypes.oneOf(['low', 'default', 'high', 'max']),
      color: React.PropTypes.string,
      element: React.PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p']),
      size: React.PropTypes.oneOf(['title', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'small'])
    };

    render() {
      return (<Heading {...this.props} {...props}/>);
    }
  }
}

var DefaultH1 = defHeader({element: 'h1'});
var DefaultH2 = defHeader({element: 'h2'});

var DefaultH3 = defHeader({element: 'h3'});

var DefaultH4 = defHeader({element: 'h4'});

var DefaultH5 = defHeader({element: 'h5'});

var DefaultH6 = defHeader({element: 'h6'});

var AlternateH1 = defHeader({element: 'h1', color: 'type-dark-2', bold: 'max'});

var AlternateH2 = defHeader({element: 'h2', size: 'h4', bold: 'high', allCaps: true});

var AlternateH3 = defHeader({element: 'h3', size: 'h4'});

var AlternateH4 = defHeader({element: 'h4', size: 'h6', bold: 'high', allCaps: true});

var AlternateH5 = defHeader({element: 'h5', size: 'h6', bold: 'high'});

var AlternateH6 = defHeader({element: 'h6'});

var MarketingH1 = defHeader({element: 'h1', size: 'title', bold: 'high', color: 'type-dark-2'});

var MarketingH2 = defHeader({element: 'h2', size: 'h1', bold: 'high', color: 'type-dark-2'});

var MarketingH3 = defHeader({element: 'h3', size: 'h2', bold: 'high', color: 'type-dark-2'});

var MarketingH4 = defHeader({element: 'h4', size: 'h3', bold: 'high', color: 'type-dark-2'});

var MarketingH5 = defHeader({element: 'h5', size: 'h4', bold: 'high', color: 'type-dark-2'});

var MarketingH6 = defHeader({element: 'h6', size: 'h5', bold: 'high', color: 'type-dark-2'});

module.exports = {
  DefaultH1,
  DefaultH2,
  DefaultH3,
  DefaultH4,
  DefaultH5,
  DefaultH6,
  AlternateH1,
  AlternateH2,
  AlternateH3,
  AlternateH4,
  AlternateH5,
  AlternateH6,
  MarketingH1,
  MarketingH2,
  MarketingH3,
  MarketingH4,
  MarketingH5,
  MarketingH6,
  Heading
};
