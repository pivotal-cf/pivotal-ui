require('../spec_helper');
describe('Panel', function() {
  var Panel;
  beforeEach(function() {
    Panel = require('../../../src/pivotal-ui-react/panels/panels').Panel;
  });

  afterEach(function() {
    React.unmountComponentAtNode(root);
  });

  describe('with no props given', function() {
    beforeEach(function() {
      React.render(<Panel>Sup</Panel>, root);
    });

    it('creates a panel', function() {
      expect('.panel .panel-body').toContainText('Sup');
    });
  });

  describe('when a kind is provided', function() {
    beforeEach(function() {
      React.render(<Panel kind="panel-basic">Sup</Panel>, root);
    });

    it('sets the kind as a class on the panel', function() {
      expect('.panel').toHaveClass('panel-basic');
    });
  });

  describe('when a title is provided', function() {
    beforeEach(function() {
      React.render(<Panel title="This is a title">Sup</Panel>, root);
    });

    it('sets the title to the panel', function() {
      expect('.panel .panel-header .panel-title-alt').toContainText('This is a title');
    });
  });

  describe('when a className is provided', function() {
    beforeEach(function() {
      React.render(<Panel className="foo myClass">Sup</Panel>, root);
    });

    it('sets the className as a class on the panel', function() {
      expect('.panel').toHaveClass('foo');
      expect('.panel').toHaveClass('myClass');
    });
  });

  describe('when padding is provided', function() {
    beforeEach(function() {
      React.render(<Panel padding="ptl">Sup</Panel>, root);
    });

    it('sets the padding as a class on the panel-body', function() {
      expect('.panel .panel-body').toHaveClass('ptl');
    });
  });

  describe('when style and scrollable are both provided', function() {
    beforeEach(function() {
      React.render(<Panel style={{color: 'red'}} scrollable={1337}>Sup</Panel>, root);
    });

    it('renders the correct style', function() {
      expect('.panel').toHaveCss({color: 'rgb(255, 0, 0)', maxHeight: '1337px'});
    });
  });

  describe('when style is provided and scrollable is not', function() {
    beforeEach(function() {
      React.render(<Panel style={{color: 'red'}}>Sup</Panel>, root);
    });

    it('renders the correct style', function() {
      expect('.panel').toHaveCss({color: 'rgb(255, 0, 0)'});
    });
  });


  describe('when scrollable is set to true', function() {
    beforeEach(function() {
      React.render(<Panel scrollable>Sup</Panel>, root);
    });

    it('adds the class "panel-scrollable"', function() {
      expect('.panel').toHaveClass('panel-scrollable');
    });

    describe('when it is set to a number', function() {
      beforeEach(function() {
        React.render(<Panel scrollable={1337}>Sup</Panel>, root);
      });

      it('sets the max-height of the panel-body to to the supplied numerical value', function() {
        expect('.panel').toHaveCss({maxHeight: '1337px'});
      });
    });
  });
});

describe('ShadowPanel', function() {
  var ShadowPanel;
  beforeEach(function() {
    ShadowPanel = require('../../../src/pivotal-ui-react/panels/panels').ShadowPanel;
    React.render(<ShadowPanel>Sup</ShadowPanel>, root);
  });

  afterEach(function() {
    React.unmountComponentAtNode(root);
  });

  it('creates a panel with the default shadow class', function() {
    expect('.panel .panel-body').toContainText('Sup');
    expect('.panel').toHaveClass('panel-shadow-3');
  });

  describe('when the shadowLevel property is set', function() {
    beforeEach(function() {
      React.render(<ShadowPanel shadowLevel={3}>Sup</ShadowPanel>, root);
    });

    it('creates a shadow panel with the corresponding level', function() {
      expect('.panel').toHaveClass('panel-shadow-3');
    });
  });
});
