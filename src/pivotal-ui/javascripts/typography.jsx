'use strict';

var React = require('react');

var TypographyMixin = require('./mixins/typography-mixin');

var Heading = React.createClass({
  mixins: [TypographyMixin],

  render: function render() {
    var {className, size, bold, allCaps, color, element, children, ...other} = this.props;
    var classes = [];

    if (className) {
      classes.push(className);
    }

    if (size) {
      classes.push(size);
    }

    if (bold) {
      classes.push('em-' + bold);
    }

    if (allCaps) {
      classes.push('em-alt');
    }

    if (color) {
      classes.push(color);
    }

    var joinedClasses = classes.join(' ');

    switch(element) {
      case 'h1':
        return (<h1 {...other} className={joinedClasses}>{children}</h1>);
      case 'h2':
        return (<h2 {...other} className={joinedClasses}>{children}</h2>);
      case 'h3':
        return (<h3 {...other} className={joinedClasses}>{children}</h3>);
      case 'h4':
        return (<h4 {...other} className={joinedClasses}>{children}</h4>);
      case 'h5':
        return (<h5 {...other} className={joinedClasses}>{children}</h5>);
      case 'h6':
        return (<h6 {...other} className={joinedClasses}>{children}</h6>);
      default:
        return (<p {...other} className={joinedClasses}> {children}</p>);
    }
  }
});

var DefaultH1 = React.createClass({
  mixins: [TypographyMixin],
  render: function() {
    return <Heading {...this.props} element='h1' />;
  }
});

var DefaultH2 = React.createClass({
  mixins: [TypographyMixin],
  render: function() {
    return <Heading {...this.props} element='h2' />;
  }
});

var DefaultH3 = React.createClass({
  mixins: [TypographyMixin],
  render: function() {
    return <Heading {...this.props} element='h3' />;
  }
});

var DefaultH4 = React.createClass({
  mixins: [TypographyMixin],
  render: function() {
    return <Heading {...this.props} element='h4' />;
  }
});

var DefaultH5 = React.createClass({
  mixins: [TypographyMixin],
  render: function() {
    return <Heading {...this.props} element='h5' />;
  }
});

var DefaultH6 = React.createClass({
  mixins: [TypographyMixin],
  render: function() {
    return <Heading {...this.props} element='h6' />;
  }
});

var AlternateH1 = React.createClass({
  mixins: [TypographyMixin],
  render: function() {
    return <Heading {...this.props} element='h1' color='type-dark-1' bold='max' />;
  }
});

var AlternateH2 = React.createClass({
  mixins: [TypographyMixin],
  render: function() {
    return <Heading {...this.props} element='h2' size='h4' bold='high' allCaps={true} />;
  }
});

var AlternateH3 = React.createClass({
  mixins: [TypographyMixin],
  render: function() {
    return <Heading {...this.props} element='h3' size='h4' />;
  }
});

var AlternateH4 = React.createClass({
  mixins: [TypographyMixin],
  render: function() {
    return <Heading {...this.props} element='h4' size='h6' bold='high' allCaps={true} />;
  }
});

var AlternateH5 = React.createClass({
  mixins: [TypographyMixin],
  render: function() {
    return <Heading {...this.props} element='h5' size='h6' bold='high' />;
  }
});

var AlternateH6 = React.createClass({
  mixins: [TypographyMixin],
  render: function() {
    return <Heading {...this.props} element='h6' />;
  }
});


var MarketingH1 = React.createClass({
  mixins: [TypographyMixin],
  render: function() {
    return <Heading {...this.props} element='h1' size='title' bold='high' color='type-dark-1' />;
  }
});

var MarketingH2 = React.createClass({
  mixins: [TypographyMixin],
  render: function() {
    return <Heading {...this.props} element='h2' size='h1' bold='high' color='type-dark-1' />;
  }
});

var MarketingH3 = React.createClass({
  mixins: [TypographyMixin],
  render: function() {
    return <Heading {...this.props} element='h3' size='h2' bold='high' color='type-dark-1' />;
  }
});

var MarketingH4 = React.createClass({
  mixins: [TypographyMixin],
  render: function() {
    return <Heading {...this.props} element='h4' size='h3' bold='high' color='type-dark-1' />;
  }
});

var MarketingH5 = React.createClass({
  mixins: [TypographyMixin],
  render: function() {
    return <Heading {...this.props} element='h5' size='h4' bold='high' color='type-dark-1' />;
  }
});

var MarketingH6 = React.createClass({
  mixins: [TypographyMixin],
  render: function() {
    return <Heading {...this.props} element='h6' size='h5' bold='high' color='type-dark-1' />;
  }
});

module.exports = {
  DefaultH1: DefaultH1,
  DefaultH2: DefaultH2,
  DefaultH3: DefaultH3,
  DefaultH4: DefaultH4,
  DefaultH5: DefaultH5,
  DefaultH6: DefaultH6,
  AlternateH1: AlternateH1,
  AlternateH2: AlternateH2,
  AlternateH3: AlternateH3,
  AlternateH4: AlternateH4,
  AlternateH5: AlternateH5,
  AlternateH6: AlternateH6,
  MarketingH1: MarketingH1,
  MarketingH2: MarketingH2,
  MarketingH3: MarketingH3,
  MarketingH4: MarketingH4,
  MarketingH5: MarketingH5,
  MarketingH6: MarketingH6,
  Heading: Heading
};
