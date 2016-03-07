require('../spec_helper');
var Toggle = require('../../../src/pivotal-ui-react/toggle/toggle').Toggle;

fdescribe('Toggle', () => {
  const onChangeSpy = jasmine.createSpy('onChange');
  beforeEach(function() {
    ReactDOM.render(<Toggle id='boggle' onChange={onChangeSpy}/>, root);
  });

  afterEach(function() {
    ReactDOM.unmountComponentAtNode(root);
  });

  it('renders a toggle switch', () => {
    expect('.toggle-switch').toExist();
  });

  it('calls the onChange callback on click', () => {
    $('#boggle').simulate('click');
    expect(onChangeSpy).toHaveBeenCalled();
  });

  it('uses provided id', function() {
    expect('.toggle-switch').toHaveAttr('id', 'boggle');
  });

  describe('when no id is provided', function() {
    const onChangeSpy1 = jasmine.createSpy('onChange1');
    const onChangeSpy2 = jasmine.createSpy('onChange2');

    beforeEach(function() {
      ReactDOM.render(
        <div>
          <Toggle onChange={onChangeSpy1}/>
          <Toggle onChange={onChangeSpy2}/>
        </div>
        , root
      );
    });

    it('generates an id', function() {
      expect($('.toggle-switch')[0].id).not.toEqual('');
      expect($('.toggle-switch')[1].id).not.toEqual('');
    });

    it('id is unique', function() {
      expect($('.toggle-switch')[0].id).not.toEqual($('.toggle-switch')[1].id);
    });

    it('calls the onChange callback on click', () => {
      const switch1 = $('.toggle-switch')[0].id;
      const switch2 = $('.toggle-switch')[1].id;

      $(`#${switch1}`).simulate('click');
      expect(onChangeSpy1).toHaveBeenCalled();

      $(`#${switch2}`).simulate('click');
      expect(onChangeSpy2).toHaveBeenCalled();
    });
  });

  describe('when the checked property is passed', function() {
    beforeEach(function() {
      ReactDOM.render(<Toggle id='toggle-switch' checked/>, root);
    });

    it('renders a checked toggle switch', function() {
      expect('.toggle-switch').toBeChecked();
    });
  });
});
