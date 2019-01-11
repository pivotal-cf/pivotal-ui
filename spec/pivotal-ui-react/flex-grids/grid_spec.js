import '../spec_helper';
import {Grid} from '../../../src/react/flex-grids';

describe('Grid', () => {
  let gridProps;

  describe('default props', () => {
    beforeEach(() => {
      gridProps = {className: 'test-class', id: 'test-id', style: {opacity: 0.75}};
      ReactDOM.render(<Grid {...gridProps}/>, root);
    });

    it('does not have grid-nogutter class by default', () => {
      expect('.grid').not.toHaveClass('grid-nogutter');
    });

    it('adds these attributes to the correct component', () => {
      expect('.grid').toHaveClass(gridProps.className);
      expect('.grid').toHaveAttr('id', gridProps.id);
      expect('.grid').toHaveCss(gridProps.style);
    });
  });

  describe('gutter prop', () => {
    beforeEach(() => {
      gridProps = {gutter: false};
      ReactDOM.render(<Grid {...gridProps}/>, root);
    });

    it('adds grid-nogutter class', () => {
      expect('.grid').toHaveClass('grid-nogutter');
    });
  });

  describe('justifyContent prop', () => {
    beforeEach(() => {
      gridProps = {justifyContent: 'space-between'};
      ReactDOM.render(<Grid {...gridProps}/>, root);
    });

    it('adds justify-content-space-between class', () => {
      expect('.grid').toHaveClass('justify-content-space-between');
    });
  });

  describe('flexDirection prop', () => {
    beforeEach(() => {
      gridProps = {flexDirection: 'column'};
      ReactDOM.render(<Grid {...gridProps}/>, root);
    });

    it('adds the flex-direction-column class ', () => {
      expect('.grid').toHaveClass('flex-direction-column');
    });
  });
});
