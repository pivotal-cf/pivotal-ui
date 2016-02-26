require('../spec_helper');
describe('Panel', function() {
  var Panel;
  beforeEach(function() {
    Panel = require('../../../src/pivotal-ui-react/panels/panels').Panel;
  });

  afterEach(function() {
    ReactDOM.unmountComponentAtNode(root);
  });

  describe('with no props given', function() {
    beforeEach(function() {
      ReactDOM.render(<Panel>Sup</Panel>, root);
    });

    it('creates a panel', function() {
      expect('.panel .panel-body').toContainText('Sup');
    });
  });

  describe('when a header is provided', function() {
    describe('when the header is a string', function() {
      beforeEach(function() {
        ReactDOM.render(<Panel header="This is a title">Sup</Panel>, root);
      });

      it('sets the header to the panel', function() {
        expect('.panel-header .panel-title-alt').toContainText('This is a title');
      });
    });

    describe('when the header is a node', function() {
      beforeEach(function() {
        const header = <div className="hey">HEY</div>;
        ReactDOM.render(<Panel header={header}>Sup</Panel>, root);
      });

      it('renders the contents without .panel-title-alt', function() {
        expect('.panel-header .hey').toContainText('HEY');
        expect('.panel-header .panel-title-alt').not.toExist();
      });
    });

    describe('when the panel header is passed actions', function() {
      beforeEach(function() {
        const actions = <div><button key={1}>I'm a button</button><button key={2}>I'm also a button</button></div>;
        const header = <div className="hey">HEY</div>;
        ReactDOM.render(<Panel header={header} actions={actions}>Sup</Panel>, root);
      });

      it('renders the actions', function() {
        expect('.panel-actions button:eq(0)').toContainText("I'm a button");
        expect('.panel-actions button:eq(1)').toContainText("I'm also a button");
      });
    });

    describe('when the panel header is passed a subtitle', () => {
      beforeEach(() => {
        const header = <div className="hey">HEY</div>;
        ReactDOM.render(<Panel header={header} subtitle="man">Sup</Panel>, root);
      });

      it('renders the subtitle', function() {
        expect('.panel-subtitle').toHaveText('man');
      });
    });

    describe('when the panel header is passed with no actions', function() {
      beforeEach(function() {
        ReactDOM.render(<Panel header="This is a title">Sup</Panel>, root);
      });

      it('does not render the actions', function() {
        expect('.panel-actions').not.toExist();
      });
    });
  });

  describe('when a footer is provided', function() {
    describe('when the footer is a string', function() {
      beforeEach(function() {
        ReactDOM.render(<Panel footer="This is a footer">Sup</Panel>, root);
      });

      it('sets the footer to the panel', function() {
        expect('.panel .panel-footer').toContainText('This is a footer');
      });
    });
  });

  describe('when attributes are provided', function() {
    beforeEach(function() {
      ReactDOM.render(<Panel className="foo myClass" innerClassName="inner-class"
                             id="outer-id"
                             style={{opacity: '0.5'}}>Sup</Panel>, root);
    });

    it('sets className, id, and style on the panel outer div', function() {
      expect('.panel').toHaveClass('foo');
      expect('.panel').toHaveClass('myClass');
      expect('.panel').toHaveAttr('id', 'outer-id');
      expect('.panel').toHaveCss({opacity: '0.5'});
    });

    it('sets innerClassName on the panel-body div', () => {
      expect('.panel-body').toHaveClass('inner-class');
    });

  });

  describe('when padding is provided', function() {
    beforeEach(function() {
      ReactDOM.render(<Panel padding="ptl">Sup</Panel>, root);
    });

    it('sets the padding as a class on the panel-body', function() {
      expect('.panel .panel-body').toHaveClass('ptl');
    });
  });

  describe('when style and scrollable are both provided', function() {
    beforeEach(function() {
      ReactDOM.render(<Panel style={{color: 'red'}} scrollable={1337}>Sup</Panel>, root);
    });

    it('renders the correct style', function() {
      expect('.panel').toHaveCss({color: 'rgb(255, 0, 0)', maxHeight: '1337px'});
    });
  });

  describe('when style is provided and scrollable is not', function() {
    beforeEach(function() {
      ReactDOM.render(<Panel style={{color: 'red'}}>Sup</Panel>, root);
    });

    it('renders the correct style', function() {
      expect('.panel').toHaveCss({color: 'rgb(255, 0, 0)'});
    });
  });


  describe('when scrollable is set to true', function() {
    beforeEach(function() {
      ReactDOM.render(<Panel scrollable>Sup</Panel>, root);
    });

    it('adds the class "panel-scrollable"', function() {
      expect('.panel').toHaveClass('panel-scrollable');
    });

    describe('when it is set to a number', function() {
      beforeEach(function() {
        ReactDOM.render(<Panel scrollable={1337}>Sup</Panel>, root);
      });

      it('sets the max-height of the panel-body to to the supplied numerical value', function() {
        expect('.panel').toHaveCss({maxHeight: '1337px'});
      });
    });
  });

  describe('when scrollable is true and a header is set', function() {
    beforeEach(function() {
      ReactDOM.render(<Panel header="hey hey hey hey hey"scrollable>HEYYYYY</Panel>, root);
    });

    it('does not scroll the header', function() {
      expect('.panel .panel-header').not.toExist();
    });
  });

  describe('when scrollable is not set', () => {
    beforeEach(function() {
      ReactDOM.render(<Panel>Sup</Panel>, root);
    });

    it('does not add the class "panel-scrollable"', () => {
      expect('.panel').not.toHaveClass('panel-scrollable');
    });
  });

  describe('PanelTitle', function() {
    let clickSpy;
    beforeEach(function() {
      clickSpy = jasmine.createSpy('click');
      const PanelTitle = require('../../../src/pivotal-ui-react/panels/panels').PanelTitle;
      ReactDOM.render(<PanelTitle className="extra-class" onClick={clickSpy}>Titlist</PanelTitle>, root);
    });

    it('renders as a panel-title-alt', function() {
      expect('.panel-title-alt').toHaveText('Titlist');
    });

    it('passes props through, including classname', function() {
      expect('.panel-title-alt').toHaveClass('extra-class');
      $('.panel-title-alt').simulate('click');
      expect(clickSpy).toHaveBeenCalled();
    });
  });
});

describe('ShadowPanel', function() {
  var ShadowPanel;
  beforeEach(function() {
    ShadowPanel = require('../../../src/pivotal-ui-react/panels/panels').ShadowPanel;
    ReactDOM.render(<ShadowPanel>Sup</ShadowPanel>, root);
  });

  afterEach(function() {
    ReactDOM.unmountComponentAtNode(root);
  });

  it('creates a panel with the default shadow class', function() {
    expect('.panel .panel-body').toContainText('Sup');
    expect('.panel').toHaveClass('panel-shadow-3');
  });

  describe('when the shadowLevel property is set', function() {
    beforeEach(function() {
      ReactDOM.render(<ShadowPanel shadowLevel={3}>Sup</ShadowPanel>, root);
    });

    it('creates a shadow panel with the corresponding level', function() {
      expect('.panel').toHaveClass('panel-shadow-3');
    });
  });
});
