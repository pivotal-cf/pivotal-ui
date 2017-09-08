import '../spec_helper';
import {Divider} from '../../../src/react/dividers';
import {itPropagatesAttributes} from '../support/shared_examples';

import {findByTag} from '../spec_helper';

describe('Divider', () => {
  let result, renderComponent;
  beforeEach(() => {
    renderComponent = props => ReactDOM.render(<Divider {...props}/>, root);
  });

  describe('rendering', () => {
    let props;

    beforeEach(() => {
      props = {className: 'test-class', id: 'test-id', style: {opacity: '0.5'}};
      result = renderComponent(props);
    });

    it('creates a divider', () => {
      expect(findByTag(result, 'hr')).toHaveClass('divider-alternate-1');
    });

    it('adds provided attributes to the correct component', () => {
      expect('hr').toHaveClass(props.className);
      expect('hr').toHaveAttr('id', props.id);
      expect('hr').toHaveCss(props.style);
    });
  });

  describe('when size is set to large', () => {
    beforeEach(() => {
      result = renderComponent({size: 'large'});
    });

    it('creates a divider with -2 appended to the classname', () => {
      expect(findByTag(result, 'hr')).toHaveClass('divider-alternate-2');
    });
  });

  describe('when inverse is true', () => {
    beforeEach(() => {
      result = renderComponent({inverse: true});
    });

    it('creates a divider without the -alternate in the class', () => {
      expect(findByTag(result, 'hr')).toHaveClass('divider-1');
    });
  });

  describe('when size is set to large and inverse is set to true', () => {
    beforeEach(() => {
      result = renderComponent({inverse: true, size: 'large'});
    });

    it('creates a divider without the -alternate in the class and -2 appended to the classname', () => {
      expect(findByTag(result, 'hr')).toHaveClass('divider-2');
    });
  });

  describe('setting a custom data attribute', () => {
    beforeEach(() => {
      result = renderComponent({'data-behavior': 'myAttr'});
    });

    it('passes the data attribute through to the divider', () => {
      expect(findByTag(result, 'hr')).toHaveAttr('data-behavior', 'myAttr');
    });
  });
});
