import '../spec_helper';
import {DropdownItem} from 'pui-react-dropdowns';

import {findByClass, findByTag, clickOn} from '../spec_helper';

describe('DropdownItem', () => {
  let result;
  const renderComponent = props => ReactTestUtils.renderIntoDocument(
    <DropdownItem {...props}>DropdownItem Text</DropdownItem>
  );

  it('passes through header', () => {
    result = renderComponent({header: true});
    expect(findByClass(result, 'dropdown-header')).toContainText('DropdownItem Text');
  });

  it('passes through divider', () => {
    result = renderComponent({divider: true});
    expect(findByClass(result, 'divider')).toBeDefined();
  });

  it('passes through className and style to the li ', () => {
    result = renderComponent({
      className: 'test-item-class',
      style: {opacity: '0.5'}
    });

    const listItem = findByTag(result, 'li');
    expect(listItem).toHaveClass('test-item-class');
    expect(listItem).toHaveCss({opacity: '0.5'});
  });

  it('passes through id to the anchor if an href is provided', () => {
    result = renderComponent({id: 'test-item-id'});

    let listItem = findByTag(result, 'li');
    expect(listItem).not.toHaveAttr('id');

    result = renderComponent({id: 'test-item-id', href: 'test'});

    listItem = findByTag(result, 'li');
    expect(listItem).not.toHaveAttr('id');
    expect(listItem.querySelector('a')).toHaveAttr('id', 'test-item-id');
  });

  it('passes through href and target to the anchor', () => {
    result = renderComponent({href: 'test', target: '_blank'});
    expect(findByTag(result, 'a')).toHaveAttr('href', 'test');
    expect(findByTag(result, 'a')).toHaveAttr('target', '_blank');
  });

  describe('onSelect handling', () => {
    let handleSelectSpy;
    describe('with href', () => {
      it('passes through onSelect on anchor click', () => {
        handleSelectSpy = jasmine.createSpy('handleSelect');
        const eventKey = '1';
        result = renderComponent({href: 'test', onSelect: handleSelectSpy, eventKey});

        clickOn(findByTag(result, 'a'));
        expect(handleSelectSpy).toHaveBeenCalled();
      });
    });

    describe('without href', () => {
      it('passes through onSelect on list item click', () => {
        handleSelectSpy = jasmine.createSpy('handleSelect');
        const eventKey = '1';
        result = renderComponent({onSelect: handleSelectSpy, eventKey});

        clickOn(findByTag(result, 'li'));
        expect(handleSelectSpy).toHaveBeenCalled();
      });
    });

    describe('with disabled prop', () => {
      it('does not call onSelect handler', () => {
        handleSelectSpy = jasmine.createSpy('handleSelect');
        result = renderComponent({href: 'test', onSelect: handleSelectSpy, disabled: true});

        expect(findByTag(result, 'li')).toHaveClass('disabled');
        expect(findByTag(result, 'a')).toHaveAttr('disabled');

        clickOn(findByTag(result, 'a'));

        expect(handleSelectSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe('when an a tag is passed in as a child', () => {
    beforeEach(() => {
      result = ReactTestUtils.renderIntoDocument(
        <DropdownItem><a href="custom">link</a></DropdownItem>
      );

      it('renders the child link', () => {
        const listItem = findByTag(result, 'li');
        expect(listItem.querySelector('a')).toHaveAttr('id', 'custom');
      });
    });
  });
});
