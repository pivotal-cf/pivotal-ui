import '../spec_helper';
import {Divider} from 'pui-react-dividers';
import {itPropagatesAttributes} from '../support/shared_examples';

import {findByTag} from '../spec_helper';

describe('Divider', () => {
  let result;
  const renderComponent = props => ReactTestUtils.renderIntoDocument(<Divider {...props}/>);

  describe('rendering', () => {
    result = renderComponent({className: 'test-class', id: 'test-id', style: {opacity: '0.5'}});

    it('creates a divider', () => {
      expect(findByTag(result, 'hr')).toHaveClass('divider-alternate-1');
    });

    itPropagatesAttributes(findByTag(result, 'hr'), {className: 'test-class', id: 'test-id', style: {opacity: '0.5'}});
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
