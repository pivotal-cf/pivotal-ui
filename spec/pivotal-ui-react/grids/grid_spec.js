require('../spec_helper');
import {propagateAttributes} from '../spec_helper';


describe('Grid', function() {
  beforeEach(function() {
    var {Row, Col} = require('../../../src/pivotal-ui-react/grids/grids');
    React.render(
      (
        <Row gutter="md" className='test-class' id='test-id' style={{opacity: '1'}}>
          <Col md={12} className='test-class2' id='test-id2' style={{opacity: '.5'}}/>
          <Col md={12}/>
        </Row>
      ),
      root
    );
  });

  afterEach(function() {
    React.unmountComponentAtNode(root);
  });

  propagateAttributes('.row', {className: 'test-class', id: 'test-id', style: {opacity: '1'}});
  propagateAttributes('.col-md-12:first', {className: 'test-class2', id: 'test-id2', style: {opacity: '0.5'}});
  it('adds the gutter class to the row', function() {
    expect('.row').toHaveClass('row-gutter-md');
  });
});
