import '../spec_helper';
import {Pagination} from '../../../src/react/pagination';

describe('Pagination', () => {
  const renderComponent = props => ReactDOM.render(<Pagination {...props}/>, root);

  beforeEach(() => {
    renderComponent();
  });

  it('renders a pagination component', () => {
    expect('div.pagination').toExist();
  });

  it('has the "group" role', () => {
    expect('div.pagination').toHaveAttr('role', 'group');
  });

  it('renders 1 .pui-btn when no items are specified', () => {
    expect($('.pagination .pui-btn').length).toBe(3);
    expect('.pagination .pui-btn:eq(0) .icon svg').toHaveClass('icon-chevron_left');
    expect('.pagination .pui-btn:eq(1)').toHaveText('1');
    expect('.pagination .pui-btn:eq(2) .icon svg').toHaveClass('icon-chevron_right');
  });

  it('renders all buttons with flat class', () => {
    expect('.pagination .pui-btn:eq(0)').toHaveClass('pui-btn-default-flat');
    expect('.pagination .pui-btn:eq(1)').toHaveClass('pui-btn-brand-flat');
    expect('.pagination .pui-btn:eq(2)').toHaveClass('pui-btn-default-flat');
  });

  describe('props', () => {
    it('renders the number of buttons specified in items, plus next and prev buttons', () => {
      renderComponent({items: 5});

      expect('.pagination .pui-btn:eq(0) .icon svg').toHaveClass('icon-chevron_left');
      expect('.pagination .pui-btn:eq(1)').toHaveText('1');
      expect('.pagination .pui-btn:eq(5)').toHaveText('5');
      expect('.pagination .pui-btn:eq(6) .icon svg').toHaveClass('icon-chevron_right');
      expect($('.pagination .pui-btn').length).toBe(7);
    });

    it('does not render next when next is false', () => {
      renderComponent({next: false});

      expect($('.pagination .pui-btn').length).toBe(2);
      expect('.pagination .pui-btn:eq(0) .icon svg').toHaveClass('icon-chevron_left');
      expect('.pagination .pui-btn:eq(1)').toHaveText('1');
    });

    it('does not render prev when prev is false', () => {
      renderComponent({prev: false});

      expect($('.pagination .pui-btn').length).toBe(2);
      expect('.pagination .pui-btn:eq(0)').toHaveText('1');
      expect('.pagination .pui-btn:eq(1) .icon svg').toHaveClass('icon-chevron_right');
    });

    it('renders an active .pui-btn when activePage number is specified', () => {
      renderComponent({activePage: 1});
      expect('.pagination .pui-btn:eq(1)').toHaveClass('pui-btn-brand-flat');
      expect('.pagination .pui-btn:eq(1)').toHaveClass('active');
    });

    it('passes the className to the top element', () => {
      renderComponent({className: 'my-class'});
      expect('div.pagination').toHaveClass('my-class');
    });

    describe('onSelect', () => {
      let onSelect;

      beforeEach(() => {
        onSelect = jasmine.createSpy('onSelect');
        renderComponent({onSelect, items: 5, activePage: 2});
      });

      it('calls on .pui-btn click', () => {
        $('.pagination .pui-btn:eq(4)').simulate('click');

        expect(onSelect).toHaveBeenCalledWith(jasmine.any(Object), {eventKey: 4, newActivePage: 4});
      });

      it('calls on prev click', () => {
        $('.pagination .pui-btn:eq(0)').simulate('click');

        expect(onSelect).toHaveBeenCalledWith(jasmine.any(Object), {eventKey: 'prev', newActivePage: 1});
      });

      it('calls on next click', () => {
        $('.pagination .pui-btn:eq(6)').simulate('click');

        expect(onSelect).toHaveBeenCalledWith(jasmine.any(Object), {eventKey: 'next', newActivePage: 3});
      });
    });
  });

  describe('when the first page is active', () => {
    beforeEach(() => {
      renderComponent({items: 3});
    });

    it('disables the left chevron', () => {
      expect('.pagination .pui-btn:eq(0)').toBeDisabled();
    });
  });

  describe('when the last page is active', () => {
    beforeEach(() => {
      renderComponent({items: 3, activePage: 3});
    });

    it('disables the left chevron', () => {
      expect('.pagination .pui-btn:last').toBeDisabled();
    });
  });

  describe('when there are more than 6 pages, and activePage = 1', () => {
    beforeEach(() => {
      renderComponent({items: 20, activePage: 1, prev: false, next: false});
    });

    it('renders pages for 1, 2, 3, 4, 20', () => {
      expect($('button').length).toBe(5);
      expect('button:eq(0)').toHaveText('1');
      expect('button:eq(1)').toHaveText('2');
      expect('button:eq(2)').toHaveText('3');
      expect('button:eq(3)').toHaveText('4');
      expect('button:eq(4)').toHaveText('20');
    });

    it('renders ellipses (…)', () => {
      expect('button:eq(3) + span').toHaveText(String.fromCharCode(8230));
    });
  });

  describe('when there are more than 6 pages, and activePage = 2', () => {
    beforeEach(() => {
      renderComponent({items: 20, activePage: 2, prev: false, next: false});
    });

    it('renders pages for 1, 2, 3, 4, 20', () => {
      expect($('button').length).toBe(5);
      expect('button:eq(0)').toHaveText('1');
      expect('button:eq(1)').toHaveText('2');
      expect('button:eq(2)').toHaveText('3');
      expect('button:eq(3)').toHaveText('4');
      expect('button:eq(4)').toHaveText('20');
    });

    it('renders ellipses (…)', () => {
      expect('button:eq(3) + span').toHaveText(String.fromCharCode(8230));
    });
  });

  describe('when there are more than 6 pages, and activePage = 3', () => {
    beforeEach(() => {
      renderComponent({items: 20, activePage: 3, prev: false, next: false});
    });

    it('renders pages for 1, 2, 3, 4, 20', () => {
      expect($('button').length).toBe(5);
      expect('button:eq(0)').toHaveText('1');
      expect('button:eq(1)').toHaveText('2');
      expect('button:eq(2)').toHaveText('3');
      expect('button:eq(3)').toHaveText('4');
      expect('button:eq(4)').toHaveText('20');
    });

    it('renders ellipses (…)', () => {
      expect('button:eq(3) + span').toHaveText(String.fromCharCode(8230));
    });
  });

  describe('when there are more than 6 pages, and activePage = 4', () => {
    beforeEach(() => {
      renderComponent({items: 20, activePage: 4, prev: false, next: false});
    });

    it('renders pages for 1, 3, 4, 5, 20', () => {
      expect($('button').length).toBe(5);
      expect('button:eq(0)').toHaveText('1');
      expect('button:eq(1)').toHaveText('3');
      expect('button:eq(2)').toHaveText('4');
      expect('button:eq(3)').toHaveText('5');
      expect('button:eq(4)').toHaveText('20');
    });

    it('renders ellipses (…)', () => {
      expect('button:eq(0) + span').toHaveText(String.fromCharCode(8230));
      expect('button:eq(3) + span').toHaveText(String.fromCharCode(8230));
    });
  });

  describe('when there are more than 6 pages, and a page in the middle is active', () => {
    beforeEach(() => {
      renderComponent({items: 20, activePage: 10, prev: false, next: false});
    });

    it('renders pages for 1, 9, 10, 11, 20', () => {
      expect($('button').length).toBe(5);
      expect('button:eq(0)').toHaveText('1');
      expect('button:eq(1)').toHaveText('9');
      expect('button:eq(2)').toHaveText('10');
      expect('button:eq(3)').toHaveText('11');
      expect('button:eq(4)').toHaveText('20');
    });

    it('renders ellipses (…)', () => {
      expect('button:eq(0) + span').toHaveText(String.fromCharCode(8230));
      expect('button:eq(3) + span').toHaveText(String.fromCharCode(8230));
    });
  });

  describe('when there are more than 6 pages, and activePage = 17', () => {
    beforeEach(() => {
      renderComponent({items: 20, activePage: 17, prev: false, next: false});
    });

    it('renders pages for 1, 16, 17, 18, 20', () => {
      expect($('button').length).toBe(5);
      expect('button:eq(0)').toHaveText('1');
      expect('button:eq(1)').toHaveText('16');
      expect('button:eq(2)').toHaveText('17');
      expect('button:eq(3)').toHaveText('18');
      expect('button:eq(4)').toHaveText('20');
    });

    it('renders ellipses (…)', () => {
      expect('button:eq(0) + span').toHaveText(String.fromCharCode(8230));
      expect('button:eq(3) + span').toHaveText(String.fromCharCode(8230));
    });
  });

  describe('when there are more than 6 pages, and activePage = 18', () => {
    beforeEach(() => {
      renderComponent({items: 20, activePage: 18, prev: false, next: false});
    });

    it('renders pages for 1, 17, 18, 19, 20', () => {
      expect($('button').length).toBe(5);
      expect('button:eq(0)').toHaveText('1');
      expect('button:eq(1)').toHaveText('17');
      expect('button:eq(2)').toHaveText('18');
      expect('button:eq(3)').toHaveText('19');
      expect('button:eq(4)').toHaveText('20');
    });

    it('renders ellipses (…)', () => {
      expect('button:eq(0) + span').toHaveText(String.fromCharCode(8230));
    });
  });

  describe('when there are more than 6 pages, and activePage = 19', () => {
    beforeEach(() => {
      renderComponent({items: 20, activePage: 19, prev: false, next: false});
    });

    it('renders pages for 1, 17, 18, 19, 20', () => {
      expect($('button').length).toBe(5);
      expect('button:eq(0)').toHaveText('1');
      expect('button:eq(1)').toHaveText('17');
      expect('button:eq(2)').toHaveText('18');
      expect('button:eq(3)').toHaveText('19');
      expect('button:eq(4)').toHaveText('20');
    });

    it('renders ellipses (…)', () => {
      expect('button:eq(0) + span').toHaveText(String.fromCharCode(8230));
    });
  });

  describe('when there are more than 6 pages, and activePage = 20', () => {
    beforeEach(() => {
      renderComponent({items: 20, activePage: 20, prev: false, next: false});
    });

    it('renders pages for 1, 17, 18, 19, 20', () => {
      expect($('button').length).toBe(5);
      expect('button:eq(0)').toHaveText('1');
      expect('button:eq(1)').toHaveText('17');
      expect('button:eq(2)').toHaveText('18');
      expect('button:eq(3)').toHaveText('19');
      expect('button:eq(4)').toHaveText('20');
    });

    it('renders ellipses (…)', () => {
      expect('button:eq(0) + span').toHaveText(String.fromCharCode(8230));
    });
  });
});
