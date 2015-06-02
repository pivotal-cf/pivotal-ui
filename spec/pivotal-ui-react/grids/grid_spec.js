require('../spec_helper');

describe('Grid', function() {
  beforeEach(function() {
    var {Row, Col} = require('../../../src/pivotal-ui-react/grids/grids');
    React.render(
      (
        <Row gutter="md">
          <Col md={12}/>
          <Col md={12}/>
        </Row>
      ),
      root
    );
  });

  afterEach(function() {
    React.unmountComponentAtNode(root);
  });

  it('adds the gutter class to the row', function() {
    expect('.row').toHaveClass('row-gutter-md');
  });
});
