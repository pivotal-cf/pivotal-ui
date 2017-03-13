import '../spec_helper' ;
import {itPropagatesAttributes} from '../support/shared_examples';

describe('Grid', function() {
  let Row, Col;

  beforeEach(function() {
    Row = require('../../../src/pivotal-ui-react/grids/grids').Row;
    Col = require('../../../src/pivotal-ui-react/grids/grids').Col;
    ReactDOM.render(
      (
        <Row gutter="md" className='test-class' id='test-id' style={{opacity: '0.75'}}>
          <Col md={12} className='test-class2' id='test-id2' style={{opacity: '.5'}}/>
          <Col md={12}/>
        </Row>
      ),
      root
    );
  });

  afterEach(function() {
    ReactDOM.unmountComponentAtNode(root);
  });

  itPropagatesAttributes('.row', {className: 'test-class', id: 'test-id', style: {opacity: '0.75'}});
  itPropagatesAttributes('.col-md-12:first', {className: 'test-class2', id: 'test-id2', style: {opacity: '0.5'}});
  it('adds the gutter class to the row', function() {
    expect('.row').toHaveClass('row-gutter-md');
  });

  it('uses row componentClass', () => {
    const CustomFunctionalClass = (props) => <a {...props}/>;
    class CustomNormalClass extends React.Component {
      render() {
        return (<article {...this.props}/>);
      }
    }

    ReactDOM.render(
      (
        <div>
          <Row componentClass="span">
            <Col md={12}/>
            <Col md={12}/>
          </Row>
          <Row componentClass={CustomFunctionalClass}>
            <Col md={12}/>
            <Col md={12}/>
          </Row>
          <Row componentClass={CustomNormalClass}>
            <Col md={12}/>
            <Col md={12}/>
          </Row>
        </div>
      ),
      root
    );

    expect('span.row').toExist();
    expect('a.row').toExist();
    expect('article.row').toExist();
  });

  it('uses col componentClass', () => {
    const CustomFunctionalClass = (props) => <a {...props}/>;
    class CustomNormalClass extends React.Component {
      render() {
        return (<article {...this.props}/>);
      }
    }

    ReactDOM.render(
      (
        <div>
          <Row>
            <Col md={12} className="col-1" componentClass={CustomFunctionalClass}/>
            <Col md={12} className="col-2" componentClass={CustomNormalClass}/>
            <Col md={12} className="col-3" componentClass="span"/>
            <Col md={12}/>
          </Row>
        </div>
      ),
      root
    );

    expect('a.col-1').toExist();
    expect('article.col-2').toExist();
    expect('span.col-3').toExist();
  });

  describe('Col sizing', () => {
    beforeEach(() => {
      ReactDOM.render(
        (
          <Row>
            <Col lg={12} className="col-1"/>
            <Col md={12} className="col-2"/>
            <Col sm={12} className="col-3"/>
            <Col xs={12} className="col-4"/>
            <Col xs={24} sm={18} md={12} lg={6} className="col-5"/>
          </Row>
        ),
        root
      );
    });

    it('renders the sizes when there is only one', () => {
      expect('.col-1').toHaveClass('col-lg-12');
      expect('.col-2').toHaveClass('col-md-12');
      expect('.col-3').toHaveClass('col-sm-12');
      expect('.col-4').toHaveClass('col-xs-12');
    });

    it('renders multiple sizes at once', () => {
      expect('.col-5').toHaveClass('col-lg-6');
      expect('.col-5').toHaveClass('col-md-12');
      expect('.col-5').toHaveClass('col-sm-18');
      expect('.col-5').toHaveClass('col-xs-24');
    });

    it('does not render undefined columns', () => {
      expect('.col-1').not.toHaveClass('col-xs-undefined');
      expect('.col-1').not.toHaveClass('col-sm-undefined');
      expect('.col-1').not.toHaveClass('col-md-undefined');
      expect('.col-2').not.toHaveClass('col-lg-undefined');
    });
  });

  describe('Col hiding', () => {
    beforeEach(() => {
      ReactDOM.render(
        (
          <Row>
            <Col md={12} {...{lgHidden: true}} className="col-1"/>
            <Col md={12} {...{mdHidden: true}} className="col-2"/>
            <Col md={12} {...{smHidden: true}} className="col-3"/>
            <Col md={12} {...{xsHidden: true}} className="col-4"/>
          </Row>
        ),
        root
      );
    });

    it('uses col hidden', () => {
      expect('.col-1').toHaveClass('hidden-lg');
      expect('.col-2').toHaveClass('hidden-md');
      expect('.col-3').toHaveClass('hidden-sm');
      expect('.col-4').toHaveClass('hidden-xs');
    });
  });

  describe('Col offset', () => {
    beforeEach(() => {
      ReactDOM.render(
        (
          <Row>
            <Col md={12} {...{lgOffset: 2}} className="col-1"/>
            <Col md={12} {...{mdOffset: 2}} className="col-2"/>
            <Col md={12} {...{smOffset: 2}} className="col-3"/>
            <Col md={12} {...{xsOffset: 2}} className="col-4"/>
          </Row>
        ),
        root
      );
    });

    it('adds the offset', () => {
      expect('.col-1').toHaveClass('col-lg-offset-2');
      expect('.col-2').toHaveClass('col-md-offset-2');
      expect('.col-3').toHaveClass('col-sm-offset-2');
      expect('.col-4').toHaveClass('col-xs-offset-2');
    });
  });
  
  describe('Col push', () => {
    beforeEach(() => {
      ReactDOM.render(
        (
          <Row>
            <Col md={12} {...{lgPush: 2}} className="col-1"/>
            <Col md={12} {...{mdPush: 2}} className="col-2"/>
            <Col md={12} {...{smPush: 2}} className="col-3"/>
            <Col md={12} {...{xsPush: 2}} className="col-4"/>
          </Row>
        ),
        root
      );
    });

    it('adds the push', () => {
      expect('.col-1').toHaveClass('col-lg-push-2');
      expect('.col-2').toHaveClass('col-md-push-2');
      expect('.col-3').toHaveClass('col-sm-push-2');
      expect('.col-4').toHaveClass('col-xs-push-2');
    });
  });
  
  describe('Col pull', () => {
    beforeEach(() => {
      ReactDOM.render(
        (
          <Row>
            <Col md={12} {...{lgPull: 2}} className="col-1"/>
            <Col md={12} {...{mdPull: 2}} className="col-2"/>
            <Col md={12} {...{smPull: 2}} className="col-3"/>
            <Col md={12} {...{xsPull: 2}} className="col-4"/>
          </Row>
        ),
        root
      );
    });

    it('adds the pull', () => {
      expect('.col-1').toHaveClass('col-lg-pull-2');
      expect('.col-2').toHaveClass('col-md-pull-2');
      expect('.col-3').toHaveClass('col-sm-pull-2');
      expect('.col-4').toHaveClass('col-xs-pull-2');
    });
  });
  
});
