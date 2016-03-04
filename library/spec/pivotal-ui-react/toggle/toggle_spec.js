require('../spec_helper');
var Toggle = require('../../../src/pivotal-ui-react/toggle/toggle').Toggle;

describe('Toggle', () => {
  const onChangeSpy = jasmine.createSpy('onChange');
  beforeEach(function() {
    ReactDOM.render(<Toggle onChange= {onChangeSpy}/>, root);
  });

  afterEach(function() {
    ReactDOM.unmountComponentAtNode(root);
  });

  it('renders a toggle switch', () => {
    expect('.toggle-switch').toExist();
  });

  fit('calls the onChange callback on click', () => {
    $('.toggle-switch').simulate('click');
    expect(onChangeSpy).toHaveBeenCalled();
  })
});
