import '../spec_helper';
import {itPropagatesAttributes} from '../support/shared_examples';
import {Grid, FlexCol} from 'pui-react-flex-grids';
import {findByClass} from '../spec_helper';


describe('FlexGrid', () => {
  const renderComponent = (gridProps, flexColProps) => ReactTestUtils.renderIntoDocument(
    <Grid {...gridProps}>
      <FlexCol {...flexColProps}/>
    </Grid>
  );

  describe('attribute propagation', () => {
    const result = renderComponent(
      {className: 'test-class', id: 'test-id', style: {opacity: 0.75}},
      {className: 'test-class2', id: 'test-id2', style: {opacity: 0.5}}
    );

    itPropagatesAttributes(findByClass(result, 'grid'), {
      className: 'test-class',
      id: 'test-id',
      style: {opacity: '0.75'}
    });

    itPropagatesAttributes(findByClass(result, 'col'), {
      className: 'test-class2',
      id: 'test-id2',
      style: {opacity: '0.5'}
    });
  });

  describe('Col sizing', () => {
    let result;
    beforeEach(() => {
      result = ReactTestUtils.renderIntoDocument(
        <Grid className="the-row">
          <FlexCol percentage={6} className="percentage-column"/>
          <FlexCol fixed={true} className="fixed-column"/>
          <FlexCol grow={2} className="grow-column"/>
        </Grid>
      );
    });

    it('assigns the grid class to the row', () => {
      expect(findByClass(result, 'the-row')).toHaveClass('grid');
    });

    it('takes percent column widths', () => {
      expect(findByClass(result, 'percentage-column')).toHaveClass('col-6');
    });

    it('takes fixed column widths', () => {
      expect(findByClass(result, 'fixed-column')).toHaveClass('col-fixed');
    });

    it('takes grow column widths', () => {
      expect(findByClass(result, 'grow-column')).toHaveClass('col-grow-2');
    });
  });

  describe('Col alignment', () => {
    let result;
    beforeEach(() => {
      result = ReactTestUtils.renderIntoDocument(
        <Grid>
          <FlexCol alignment="middle" className="first-column"/>
        </Grid>
      );
    });

    it('takes column alignment', () => {
      expect(findByClass(result, 'first-column')).toHaveClass('col-align-middle');
    });
  });

  describe('content alignment', () => {
    let result;
    beforeEach(() => {
      result = ReactTestUtils.renderIntoDocument(
        <Grid>
          <FlexCol contentAlignment="middle" className="first-column"/>
        </Grid>
      );
    });

    it('takes content alignment', () => {
      expect(findByClass(result, 'first-column')).toHaveClass('col-middle');
    });
  });

  describe('Col breakpoints', () => {
    let result;
    beforeEach(() => {
      result = ReactTestUtils.renderIntoDocument(
        <Grid>
          <FlexCol breakpoint="md" className="first-column"/>
        </Grid>
      );
    });

    it('takes column breakpoints', () => {
      expect(findByClass(result, 'first-column')).toHaveClass('col-md');
    });
  });
});
