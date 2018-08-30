import '../spec_helper';
import {Pagination} from '../../../src/react/pagination';

describe('Pagination', () => {
  let subject;
  const renderComponent = props => subject = shallow(<Pagination {...props}/>);

  beforeEach(() => {
    renderComponent();
  });

  it('renders a pagination component', () => {
    expect(subject.find('div.pagination').exists()).toBeTruthy();
  });

  it('has the "group" role', () => {
    expect(subject.find('div.pagination').prop('role')).toBe('group');
  });

  it('renders 1 .pui-btn when no items are specified', () => {
    expect(subject.find('.pagination .pui-btn').length).toBe(3);
    expect(subject.find('.pagination .pui-btn').at(0).find('.icon svg').hasClass('icon-chevron_left')).toBeTruthy();
    expect(subject.find('.pagination .pui-btn').at(1).text()).toBe('1');
    expect(subject.find('.pagination .pui-btn').at(2).find('.icon svg').hasClass('icon-chevron_right')).toBeTruthy();
  });

  it('renders all buttons with flat class', () => {
    expect(subject.find('.pagination .pui-btn').at(0).hasClass('pui-btn-default-flat')).toBeTruthy();
    expect(subject.find('.pagination .pui-btn').at(1).hasClass('pui-btn-brand-flat')).toBeTruthy();
    expect(subject.find('.pagination .pui-btn').at(2).hasClass('pui-btn-default-flat')).toBeTruthy();
  });

  describe('props', () => {
    it('renders the number of buttons specified in items, plus next and prev buttons', () => {
      renderComponent({items: 5});

      expect(subject.find('.pagination .pui-btn').at(0).find('.icon svg').hasClass('icon-chevron_left')).toBeTruthy();
      expect(subject.find('.pagination .pui-btn').at(1).text()).toBe('1');
      expect(subject.find('.pagination .pui-btn').at(5).text()).toBe('5');
      expect(subject.find('.pagination .pui-btn').at(6).find('.icon svg').hasClass('icon-chevron_right')).toBeTruthy();
      expect(subject.find('.pagination .pui-btn').length).toBe(7);
    });

    it('does not render next when next is false', () => {
      renderComponent({next: false});

      expect(subject.find('.pagination .pui-btn').length).toBe(2);
      expect(subject.find('.pagination .pui-btn').at(0).find('.icon svg').hasClass('icon-chevron_left')).toBeTruthy();
      expect(subject.find('.pagination .pui-btn').at(1).text()).toBe('1');
    });

    it('does not render prev when prev is false', () => {
      renderComponent({prev: false});

      expect(subject.find('.pagination .pui-btn').length).toBe(2);
      expect(subject.find('.pagination .pui-btn').at(0).text()).toBe('1');
      expect(subject.find('.pagination .pui-btn').at(1).find('.icon svg').hasClass('icon-chevron_right')).toBeTruthy();
    });

    it('renders an active .pui-btn when activePage number is specified', () => {
      renderComponent({activePage: 1});
      expect(subject.find('.pagination .pui-btn').at(1).hasClass('pui-btn-brand-flat')).toBeTruthy();
      expect(subject.find('.pagination .pui-btn').at(1).hasClass('active')).toBeTruthy();
    });

    it('passes the className to the top element', () => {
      renderComponent({className: 'my-class'});
      expect(subject.find('div.pagination').hasClass('my-class')).toBeTruthy();
    });

    describe('onSelect', () => {
      let onSelect;

      beforeEach(() => {
        onSelect = jest.fn().mockName('onSelect');
        renderComponent({onSelect, items: 5, activePage: 2});
      });

      it('calls on .pui-btn click', () => {
        subject.find('.pagination .pui-btn').at(4).simulate('click');

        expect(onSelect).toHaveBeenCalledWith(expect.any(Object), {eventKey: 4, newActivePage: 4});
      });

      it('calls on prev click', () => {
        subject.find('.pagination .pui-btn').at(0).simulate('click');

        expect(onSelect).toHaveBeenCalledWith(expect.any(Object), {eventKey: 'prev', newActivePage: 1});
      });

      it('calls on next click', () => {
        subject.find('.pagination .pui-btn').at(6).simulate('click');

        expect(onSelect).toHaveBeenCalledWith(expect.any(Object), {eventKey: 'next', newActivePage: 3});
      });
    });
  });

  describe('when the first page is active', () => {
    beforeEach(() => {
      renderComponent({items: 3});
    });

    it('disables the left chevron', () => {
      expect(subject.find('.pagination .pui-btn').at(0).prop('disabled')).toBeTruthy();
    });
  });

  describe('when the last page is active', () => {
    beforeEach(() => {
      renderComponent({items: 3, activePage: 3});
    });

    it('disables the left chevron', () => {
      expect(subject.find('.pagination .pui-btn:last').prop('disabled')).toBeTruthy();
    });
  });

  describe('when there are more than 6 pages, and activePage = 1', () => {
    beforeEach(() => {
      renderComponent({items: 20, activePage: 1, prev: false, next: false});
    });

    it('renders pages for 1, 2, 3, 4, 20', () => {
      expect(subject.find('button').length).toBe(5);
      expect(subject.find('button').at(0).text()).toBe('1');
      expect(subject.find('button').at(1).text()).toBe('2');
      expect(subject.find('button').at(2).text()).toBe('3');
      expect(subject.find('button').at(3).text()).toBe('4');
      expect(subject.find('button').at(4).text()).toBe('20');
    });

    it('renders ellipses (…)', () => {
      expect(subject.find('button').at(3).find('+ span').text()).toBe(String.fromCharCode(8230));
    });
  });

  describe('when there are more than 6 pages, and activePage = 2', () => {
    beforeEach(() => {
      renderComponent({items: 20, activePage: 2, prev: false, next: false});
    });

    it('renders pages for 1, 2, 3, 4, 20', () => {
      expect(subject.find('button').length).toBe(5);
      expect(subject.find('button').at(0).text()).toBe('1');
      expect(subject.find('button').at(1).text()).toBe('2');
      expect(subject.find('button').at(2).text()).toBe('3');
      expect(subject.find('button').at(3).text()).toBe('4');
      expect(subject.find('button').at(4).text()).toBe('20');
    });

    it('renders ellipses (…)', () => {
      expect(subject.find('button').at(3).find('+ span').text()).toBe(String.fromCharCode(8230));
    });
  });

  describe('when there are more than 6 pages, and activePage = 3', () => {
    beforeEach(() => {
      renderComponent({items: 20, activePage: 3, prev: false, next: false});
    });

    it('renders pages for 1, 2, 3, 4, 20', () => {
      expect(subject.find('button').length).toBe(5);
      expect(subject.find('button').at(0).text()).toBe('1');
      expect(subject.find('button').at(1).text()).toBe('2');
      expect(subject.find('button').at(2).text()).toBe('3');
      expect(subject.find('button').at(3).text()).toBe('4');
      expect(subject.find('button').at(4).text()).toBe('20');
    });

    it('renders ellipses (…)', () => {
      expect(subject.find('button').at(3).find('+ span').text()).toBe(String.fromCharCode(8230));
    });
  });

  describe('when there are more than 6 pages, and activePage = 4', () => {
    beforeEach(() => {
      renderComponent({items: 20, activePage: 4, prev: false, next: false});
    });

    it('renders pages for 1, 3, 4, 5, 20', () => {
      expect(subject.find('button').length).toBe(5);
      expect(subject.find('button').at(0).text()).toBe('1');
      expect(subject.find('button').at(1).text()).toBe('3');
      expect(subject.find('button').at(2).text()).toBe('4');
      expect(subject.find('button').at(3).text()).toBe('5');
      expect(subject.find('button').at(4).text()).toBe('20');
    });

    it('renders ellipses (…)', () => {
      expect(subject.find('button').at(0).find('+ span').text()).toBe(String.fromCharCode(8230));
      expect(subject.find('button').at(3).find('+ span').text()).toBe(String.fromCharCode(8230));
    });
  });

  describe('when there are more than 6 pages, and a page in the middle is active', () => {
    beforeEach(() => {
      renderComponent({items: 20, activePage: 10, prev: false, next: false});
    });

    it('renders pages for 1, 9, 10, 11, 20', () => {
      expect(subject.find('button').length).toBe(5);
      expect(subject.find('button').at(0).text()).toBe('1');
      expect(subject.find('button').at(1).text()).toBe('9');
      expect(subject.find('button').at(2).text()).toBe('10');
      expect(subject.find('button').at(3).text()).toBe('11');
      expect(subject.find('button').at(4).text()).toBe('20');
    });

    it('renders ellipses (…)', () => {
      expect(subject.find('button').at(0).find('+ span').text()).toBe(String.fromCharCode(8230));
      expect(subject.find('button').at(3).find('+ span').text()).toBe(String.fromCharCode(8230));
    });
  });

  describe('when there are more than 6 pages, and activePage = 17', () => {
    beforeEach(() => {
      renderComponent({items: 20, activePage: 17, prev: false, next: false});
    });

    it('renders pages for 1, 16, 17, 18, 20', () => {
      expect(subject.find('button').length).toBe(5);
      expect(subject.find('button').at(0).text()).toBe('1');
      expect(subject.find('button').at(1).text()).toBe('16');
      expect(subject.find('button').at(2).text()).toBe('17');
      expect(subject.find('button').at(3).text()).toBe('18');
      expect(subject.find('button').at(4).text()).toBe('20');
    });

    it('renders ellipses (…)', () => {
      expect(subject.find('button').at(0).find('+ span').text()).toBe(String.fromCharCode(8230));
      expect(subject.find('button').at(3).find('+ span').text()).toBe(String.fromCharCode(8230));
    });
  });

  describe('when there are more than 6 pages, and activePage = 18', () => {
    beforeEach(() => {
      renderComponent({items: 20, activePage: 18, prev: false, next: false});
    });

    it('renders pages for 1, 17, 18, 19, 20', () => {
      expect(subject.find('button').length).toBe(5);
      expect(subject.find('button').at(0).text()).toBe('1');
      expect(subject.find('button').at(1).text()).toBe('17');
      expect(subject.find('button').at(2).text()).toBe('18');
      expect(subject.find('button').at(3).text()).toBe('19');
      expect(subject.find('button').at(4).text()).toBe('20');
    });

    it('renders ellipses (…)', () => {
      expect(subject.find('button').at(0).find('+ span').text()).toBe(String.fromCharCode(8230));
    });
  });

  describe('when there are more than 6 pages, and activePage = 19', () => {
    beforeEach(() => {
      renderComponent({items: 20, activePage: 19, prev: false, next: false});
    });

    it('renders pages for 1, 17, 18, 19, 20', () => {
      expect(subject.find('button').length).toBe(5);
      expect(subject.find('button').at(0).text()).toBe('1');
      expect(subject.find('button').at(1).text()).toBe('17');
      expect(subject.find('button').at(2).text()).toBe('18');
      expect(subject.find('button').at(3).text()).toBe('19');
      expect(subject.find('button').at(4).text()).toBe('20');
    });

    it('renders ellipses (…)', () => {
      expect(subject.find('button').at(0).find('+ span').text()).toBe(String.fromCharCode(8230));
    });
  });

  describe('when there are more than 6 pages, and activePage = 20', () => {
    beforeEach(() => {
      renderComponent({items: 20, activePage: 20, prev: false, next: false});
    });

    it('renders pages for 1, 17, 18, 19, 20', () => {
      expect(subject.find('button').length).toBe(5);
      expect(subject.find('button').at(0).text()).toBe('1');
      expect(subject.find('button').at(1).text()).toBe('17');
      expect(subject.find('button').at(2).text()).toBe('18');
      expect(subject.find('button').at(3).text()).toBe('19');
      expect(subject.find('button').at(4).text()).toBe('20');
    });

    it('renders ellipses (…)', () => {
      expect(subject.find('button').at(0).find('+ span').text()).toBe(String.fromCharCode(8230));
    });
  });
});
