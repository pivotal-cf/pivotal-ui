import '../spec_helper';

import {Pagination} from '../../../src/react/pagination';

describe('Pagination', () => {
  let subject;

  const renderComponent = props => ReactDOM.render(<Pagination {...props}/>, root);

  beforeEach(() => {
    subject = renderComponent();
  });

  it('renders a pagination component', () => {
    expect('div.pagination').toExist();
  });

  it('has the "btn-group" class', () => {
    expect('div.pagination').toHaveClass('btn-group');
  });

  it('has the "group" role', () => {
    expect('div.pagination').toHaveAttr('role', 'group');
  });

  it('renders 1 button when no items are specified',() => {
    expect($('.pagination button').length).toBe(3);
    expect('.pagination button:eq(0)').toHaveText('‹');
    expect('.pagination button:eq(1)').toHaveText('1');
    expect('.pagination button:eq(2)').toHaveText('›');
  });

  it('renders all buttons with the btn class', () => {
    expect('.pagination button:eq(0)').toHaveClass('btn');
    expect('.pagination button:eq(1)').toHaveClass('btn');
    expect('.pagination button:eq(2)').toHaveClass('btn');
  });

  it('renders all buttons with the btn-default-alt class', () => {
    expect('.pagination button:eq(0)').toHaveClass('btn-default-alt');
    expect('.pagination button:eq(1)').toHaveClass('btn-default-alt');
    expect('.pagination button:eq(2)').toHaveClass('btn-default-alt');
  });

  describe('props', () => {
    it('renders the number of buttons specified in items, plus next and prev buttons', () => {
      subject = renderComponent({items: 5});

      expect('.pagination button:eq(0)').toHaveText('‹');
      expect('.pagination button:eq(1)').toHaveText('1');
      expect('.pagination button:eq(5)').toHaveText('5');
      expect('.pagination button:eq(6)').toHaveText('›');
      expect($('.pagination button').length).toBe(7);
    });

    it('does not render next when next is false',() => {
      subject = renderComponent({next: false});

      expect($('.pagination button').length).toBe(2);
      expect('.pagination button:eq(0)').toHaveText('‹');
      expect('.pagination button:eq(1)').toHaveText('1');
    });

    it('does not render prev when prev is false',() => {
      subject = renderComponent({prev: false});

      expect($('.pagination button').length).toBe(2);
      expect('.pagination button:eq(0)').toHaveText('1');
      expect('.pagination button:eq(1)').toHaveText('›');
    });

    it('renders an active button when activePage number is specified', () => {
      subject = renderComponent({activePage: 1});
      expect('.pagination button:eq(1)').toHaveClass('btn-default');
      expect('.pagination button:eq(1)').not.toHaveClass('btn-default-alt');
    });

    it('renders large buttons when large prop is true', () => {
      subject = renderComponent({large: true});
      expect('div.pagination').toHaveClass('btn-group-large');
      expect('div.pagination').not.toHaveClass('btn-group-small');
      expect('div.pagination').toHaveClass('btn-group');
    });

    it('renders small buttons when small prop is true', () => {
      subject = renderComponent({small: true});
      expect('div.pagination').toHaveClass('btn-group-small');
      expect('div.pagination').not.toHaveClass('btn-group-large');
      expect('div.pagination').toHaveClass('btn-group');
    });

    describe('onSelect', () => {
      let onSelect;

      beforeEach(() => {
        onSelect = jasmine.createSpy('onSelect');
        subject = renderComponent({onSelect, items: 5});
      });

      it('calls on button click', () => {
        $('.pagination button:eq(4)').simulate('click');

        expect(onSelect).toHaveBeenCalledWith(jasmine.any(Object), {eventKey: 4});
      });

      it('calls on prev click', () => {
        $('.pagination button:eq(0)').simulate('click');

        expect(onSelect).toHaveBeenCalledWith(jasmine.any(Object), {eventKey: 'prev'});
      });

      it('calls on next click', () => {
        $('.pagination button:eq(6)').simulate('click');

        expect(onSelect).toHaveBeenCalledWith(jasmine.any(Object), {eventKey: 'next'});
      });
    });
  });
});
