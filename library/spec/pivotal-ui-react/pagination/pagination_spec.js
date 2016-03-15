require('../spec_helper');
var Pagination = require('../../../src/pivotal-ui-react/pagination/pagination').Pagination;

describe('Pagination', () => {
  beforeEach(() => {
    ReactDOM.render(<Pagination></Pagination>, root)
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(root)
  });

  it('renders a pagination component', () => {
    expect('.pagination').toExist()
  });

  describe('props', () => {
    it('renders the number of buttons specified in items, plus next and prev buttons', () => {
      ReactDOM.render(<Pagination items={5}></Pagination>, root);

      expect('.pagination li:eq(0)').toContainText('‹');
      expect('.pagination li:eq(6)').toContainText('›');
      expect('.pagination li:eq(1)').toContainText('1');
      expect('.pagination li:eq(5)').toContainText('5');
      expect($('.pagination li').length).toBe(7);
    });

    it('renders 1 button when no items are specified',() => {
      ReactDOM.render(<Pagination></Pagination>, root);
      expect($('.pagination li').length).toBe(3);
    });

    it('does not render next and prev buttons when next and prev are false',() => {
      ReactDOM.render(<Pagination next={false} prev={false}></Pagination>, root);
      expect($('.pagination li').length).toBe(1);
    });

    it('renders an active button when activePage number is specified', () => {
      ReactDOM.render(<Pagination activePage={1}></Pagination>, root);
      expect('.pagination .active').toExist();
    });

    it('calls onSelect callback on button click', () => {
      const onSelectSpy = jasmine.createSpy('onSelect');
      ReactDOM.render(<Pagination onSelect={onSelectSpy}></Pagination>, root);
      $('.pagination li:eq(1)').simulate('click');
      expect(onSelectSpy).toHaveBeenCalledWith(jasmine.any(Object), {eventKey: 1});
    });
  });
});
