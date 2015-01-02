'use strict';

var React = require('react');
var DefaultH1 = require('./typography.jsx').DefaultH1;
var DefaultH2 = require('./typography.jsx').DefaultH1;
var DividerInverse = require('./dividers.jsx').DividerInverse;
var Pane = require('./panes.jsx').Pane;
var HighlightAltButton = require('./buttons.jsx').HighlightAltButton;

var PivnetHomepage = React.createClass({
  render: function () {
    return (
      <div className="bg-dark-1 txt-c ptxl">
        <div className="pvxxxl">
          <DefaultH1 color="type-neutral-9" className="mbn">Explore, download, and update Pivotal software and services</DefaultH1>
          <DefaultH2 color="type-neutral-11" bold="low" className="mtn">Software designed with the enterprise in mind</DefaultH2>
        </div>

        <DividerInverse className="mbn" />

        <Pane className="bg-shadow-1">
          <div className="row">
            <div className="col-md-8 col-md-offset-8">
              <HighlightAltButton className="mtxxl" block="true" large="true">Join</HighlightAltButton>
              <p className="type-sm type-neutral-6">To download and evaluate all products and services</p>
            </div>
          </div>
        </Pane>
      </div>
      );
  }
});

module.exports = {
  PivnetHomepage: PivnetHomepage
};
