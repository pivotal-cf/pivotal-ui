import '../spec_helper';
import {DropdownItem} from '../../../src/react/dropdowns';

describe('DropdownItem', () => {
  let subject;

  beforeEach(() => {
    subject = ReactDOM.render(<DropdownItem>DropdownItem Text</DropdownItem>, root);
  });

  describe('header', () => {
    beforeEach(() => {
      subject::setProps({header: true});
    });

    it('passes through header', () => {
      expect('#root .dropdown-header').toContainText('DropdownItem Text');
    });
  });

  describe('divider', () => {
    beforeEach(() => {
      subject::setProps({divider: true});
    });

    it('passes through divider', () => {
      expect('#root .divider').toExist();
    });
  });

  describe('className', () => {
    beforeEach(() => {
      subject::setProps({className: 'test-item-class'});
    });

    it('passes through className to the li', () => {
      expect('#root li').toHaveClass('test-item-class');
    });
  });

  describe('style', () => {
    beforeEach(() => {
      subject::setProps({style: {opacity: '0.5'}});
    });

    it('passes through style to the li', () => {
      expect('#root li').toHaveCss({opacity: '0.5'});
    });
  });

  describe('id', () => {
    beforeEach(() => {
      subject::setProps({id: 'test-item-id'});
    });

    describe('with href', () => {
      beforeEach(() => {
        subject::setProps({href: 'test'});
      });

      it('passes through id to the anchor', () => {
        expect('#root li a').toHaveAttr('id', 'test-item-id');
      });
    });

    describe('without href', () => {
      it('does not pass through id to the anchor', () => {
        expect('#root li').not.toHaveAttr('id');
        expect('#root li a').not.toExist();
      });
    });
  });

  describe('with href and target', () => {
    beforeEach(() => {
      subject::setProps({href: 'test', target: '_blank'});
    });

    it('passes through href and target to the anchor', () => {
      expect('#root a').toHaveAttr('href', 'test');
      expect('#root a').toHaveAttr('target', '_blank');
    });
  });

  describe('onSelect handling', () => {
    let handleSelectSpy;
    const eventKey = '1';

    beforeEach(() => {
      handleSelectSpy = jasmine.createSpy('handleSelect');
      subject::setProps({onSelect: handleSelectSpy, eventKey});
    });

    describe('when li is clicked', () => {
      beforeEach(() => {
        $('#root li').click();
      });

      it('calls onSelect on li click', () => {
        expect(handleSelectSpy).toHaveBeenCalledWith(jasmine.any(Object), eventKey);
      });
    });
  });

  describe('onClick handling', () => {
    let handleClickSpy;

    beforeEach(() => {
      handleClickSpy = jasmine.createSpy('handleClick');
      subject::setProps({onClick: handleClickSpy});
    });

    describe('when li is clicked', () => {
      beforeEach(() => {
        $('#root li').click();
      });

      it('calls onClick on li click', () => {
        expect(handleClickSpy).toHaveBeenCalledWith(jasmine.any(Object));
      });
    });

    describe('with disabled prop', () => {
      beforeEach(() => {
        subject::setProps({href: 'test', disabled: true});
      });

      it('does not call onClick handler', () => {
        expect('#root li').toHaveClass('disabled');
        expect('#root a').toHaveAttr('disabled');
        $('#root a').click();

        expect(handleClickSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe('when an a tag is passed in as a child', () => {
    beforeEach(() => {
      subject = ReactDOM.render(
        <DropdownItem><a href="custom">link</a></DropdownItem>, root
      );

      it('renders the child link', () => {
        expect('#root li a').toHaveAttr('id', 'custom');
      });
    });
  });
});
