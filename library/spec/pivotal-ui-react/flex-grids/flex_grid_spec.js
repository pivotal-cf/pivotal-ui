import '../spec_helper';
import {itPropagatesAttributes} from '../support/shared_examples';
import {Grid, FlexCol} from 'pui-react-flex-grids';
import {findByClass} from '../spec_helper';

describe('FlexGrid', () => {
  const renderComponent = (gridProps, flexColProps) => ReactDOM.render(
    <Grid {...gridProps}>
      <FlexCol {...flexColProps}/>
    </Grid>,
    root
  );

  describe('attribute propagation', () => {
    let gridProps, flexColProps;

    beforeEach(() => {
      gridProps = {className: 'test-class', id: 'test-id', style: {opacity: 0.75}};
      flexColProps = {className: 'test-class2', id: 'test-id2', style: {opacity: 0.5}}
      renderComponent(gridProps, flexColProps);
    });

    it('adds these attributes to the correct component', () => {
      expect('.grid').toHaveClass(gridProps.className);
      expect('.grid').toHaveAttr('id', gridProps.id);
      expect('.grid').toHaveCss(gridProps.style);
      expect('.col').toHaveClass(flexColProps.className);
      expect('.col').toHaveAttr('id', flexColProps.id);
      expect('.col').toHaveCss(flexColProps.style);
    });
  });

  describe('Col sizing', () => {
    let result;
    beforeEach(() => {
      result = ReactDOM.render(
        <Grid className="the-row">
          <FlexCol col={6} className="col-column"/>
          <FlexCol fixed={true} className="fixed-column"/>
          <FlexCol grow={2} className="grow-column"/>
        </Grid>,
        root
      );
    });

    it('assigns the grid class to the row', () => {
      expect(findByClass(result, 'the-row')).toHaveClass('grid');
    });

    it('takes percent column widths', () => {
      expect(findByClass(result, 'col-column')).toHaveClass('col-6');
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
      result = ReactDOM.render(
        <Grid>
          <FlexCol alignment="middle" className="first-column"/>
        </Grid>,
        root
      );
    });

    it('takes column alignment', () => {
      expect(findByClass(result, 'first-column')).toHaveClass('col-align-middle');
    });
  });

  describe('content alignment', () => {
    let result;
    beforeEach(() => {
      result = ReactDOM.render(
        <Grid>
          <FlexCol contentAlignment="middle" className="first-column"/>
        </Grid>,
        root
      );
    });

    it('takes content alignment', () => {
      expect(findByClass(result, 'first-column')).toHaveClass('col-middle');
    });
  });

  describe('Col breakpoints', () => {
    let result;
    beforeEach(() => {
      result = ReactDOM.render(
        <Grid>
          <FlexCol breakpoint="md" className="first-column"/>
        </Grid>,
        root
      );
    });

    it('takes column breakpoints', () => {
      expect(findByClass(result, 'first-column')).toHaveClass('col-md');
    });
  });
});
