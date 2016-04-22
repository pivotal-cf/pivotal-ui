import {DropdownItem} from '../../../src/pivotal-ui-react/dropdowns/dropdowns';

describe('DropdownItem', () => {
  let props = {
    className: 'test-item-class',
    id: 'test-item-id',
    style: {
      opacity: '1'
    }
  };

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(root);
  });

  it('passes through header', () => {
    ReactDOM.render(
      <DropdownItem header>HeadText</DropdownItem>,
      root);
    expect('#root li.dropdown-header').toContainText('HeadText');
  });

  it('passes through divider', () => {
    ReactDOM.render(
      <DropdownItem divider />,
      root);
    expect('#root li.divider').toExist();
  });

  it('passes through className to the li ', () => {
    ReactDOM.render(
      <DropdownItem {...props}>Item</DropdownItem>,
      root);
    expect('#root li').toHaveClass(props.className);
  });

  it('passes through style to the li', () => {
    ReactDOM.render(
      <DropdownItem {...props}>Item</DropdownItem>,
      root);
    expect('#root li').toHaveCss(props.style);
  });

  describe('href', () => {
    it('passes through id and href to the anchor', () => {
      ReactDOM.render(
        <DropdownItem href='test' {...props}>Item</DropdownItem>,
        root);
      expect('#root li a#test-item-id').toExist();
      expect('#root li a#test-item-id').toHaveAttr('href', 'test');
    });

    describe('target', () => {
      it('passes through target to the anchor when provided', () => {
        ReactDOM.render(
          <DropdownItem href='test' target="_blank" {...props}>Item</DropdownItem>,
          root);
        expect('#root li a#test-item-id').toHaveAttr('target', '_blank');
      });

      it('does not pass through target to the anchor when provided', () => {
        ReactDOM.render(
          <DropdownItem href='test' {...props}>Item</DropdownItem>,
          root);
        expect('#root li a#test-item-id').not.toHaveAttr('target');
      });
    });
  });

  describe('onSelect handling', () => {
    let handleSelectSpy;
    describe('with href', () => {
      it('passes through onSelect with eventKey', () => {
        handleSelectSpy = jasmine.createSpy('handleSelect');
        const eventKey = '1';
        ReactDOM.render(
          <DropdownItem href="/whatever" onSelect={handleSelectSpy} eventKey={eventKey}>Item</DropdownItem>,
          root);

        $('#root li a').simulate('click');
        expect(handleSelectSpy).toHaveBeenCalled();
      });
    });

    describe('without href', () => {
      it('passes through onSelect with eventKey', () => {
        handleSelectSpy = jasmine.createSpy('handleSelect');
        const eventKey = '1';
        ReactDOM.render(
          <DropdownItem onSelect={handleSelectSpy} eventKey={eventKey}>Item</DropdownItem>,
          root);

        $('#root li').simulate('click');
        expect(handleSelectSpy).toHaveBeenCalled();
      });
    });

    describe('with disabled prop', () => {
      it('does not call onSelect handler', () => {
        handleSelectSpy = jasmine.createSpy('handleSelect');
        ReactDOM.render(
          <DropdownItem disabled href="/whatever" onSelect={handleSelectSpy}>Item</DropdownItem>,
          root);
        expect('#root li').toHaveClass('disabled');
        expect('#root li a').toHaveAttr('disabled');
        $('#root li a').simulate('click');
        expect(handleSelectSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe('when href is not passed in as a prop', () => {
    describe('when an a tag is passed in as a child', () => {
      beforeEach(() => {
        ReactDOM.render(
          <DropdownItem><a href="custom">link</a></DropdownItem>,
          root);
      });

      it('renders the child link', () => {
        expect('#root li a').toHaveAttr('href', 'custom');
      });
    });

    it('does not render an anchor element', () => {
      ReactDOM.render(
        <DropdownItem>Item</DropdownItem>,
        root);
      expect('#root li a').not.toExist();
    });
  });
});
