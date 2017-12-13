import '../spec_helper';
import {Panel} from '../../../src/react/panels';
import {FlexCol} from '../../../src/react/flex-grids';

describe('Panel', () => {
  let subject;

  beforeEach(() => {
    subject = ReactDOM.render(<Panel/>, root);
  });

  it('renders a panel-container', () => {
    expect('.panel-container').toExist();
  });

  it('does not render a panel title', () => {
    expect('.panel-container > .panel-title').not.toExist();
  });

  it('renders a panel with the expected classes', () => {
    expect('.panel-container > .panel').toHaveClass('bg-neutral-11');
    expect('.panel-container > .panel').toHaveClass('box-shadow-1');
    expect('.panel-container > .panel').toHaveClass('border-rounded');
  });

  it('does not render a header', () => {
    expect('.panel-header').not.toExist();
  });

  it('does not render a panel-body', () => {
    expect('.panel-body').not.toExist();
  });

  it('does not render a footer', () => {
    expect('.panel-footer').not.toExist();
  });

  describe('className', () => {
    beforeEach(() => {
      subject::setProps({className: 'custom-panel-container-class'});
    });

    it('renders the panel class name', () => {
      expect('.panel-container').toHaveClass('custom-panel-container-class');
    });
  });

  describe('title', () => {
    beforeEach(() => {
      subject::setProps({title: 'some title'});
    });

    it('renders the title', () => {
      expect('.panel-container > .panel-title > .col:eq(0)').toHaveText('some title');
      expect('.panel-container > .panel-title > .col:eq(0)').toHaveClass('h5');
      expect('.panel-container > .panel-title > .col:eq(0)').toHaveClass('em-high');
      expect('.panel-container > .panel-title > .col:eq(0)').toHaveClass('type-ellipsis');
    });

    describe('with titleClassName', () => {
      beforeEach(() => {
        subject::setProps({titleClassName: 'custom-title-class'});
      });

      it('renders the title class name', () => {
        expect('.panel-container > .panel-title').toHaveClass('custom-title-class');
      });
    });
  });

  describe('titleCols', () => {
    beforeEach(() => {
      subject::setProps({titleCols: [
        <FlexCol>Col 1</FlexCol>,
        <FlexCol>Col 2</FlexCol>
      ]});
    });

    it('renders the title cols', () => {
      expect('.panel-container > .panel-title > .col').toHaveLength(2);
      expect('.panel-container > .panel-title > .col:eq(0)').toHaveText('Col 1');
      expect('.panel-container > .panel-title > .col:eq(1)').toHaveText('Col 2');
    });

    describe('with a title', () => {
      beforeEach(() => {
        subject::setProps({title: 'My Title'});
      });

      it('renders the title before the title cols', () => {
        expect('.panel-container > .panel-title > .col').toHaveLength(3);
        expect('.panel-container > .panel-title > .col:eq(0)').toHaveText('My Title');
        expect('.panel-container > .panel-title > .col:eq(1)').toHaveText('Col 1');
        expect('.panel-container > .panel-title > .col:eq(2)').toHaveText('Col 2');
      });
    });
  });

  describe('panelClassName', () => {
    beforeEach(() => {
      subject::setProps({panelClassName: 'custom-panel-class'});
    });

    it('renders the panel class name', () => {
      expect('.panel').toHaveClass('custom-panel-class');
    });
  });

  describe('header', () => {
    beforeEach(() => {
      subject::setProps({header: 'some header'});
    });

    it('renders the header', () => {
      expect('.panel > .panel-header > .col:eq(0)').toHaveText('some header');
      expect('.panel > .panel-header > .col:eq(0)').toHaveClass('type-ellipsis');
      expect('.panel > .panel-header > .col:eq(0)').toHaveClass('em-high');
    });

    describe('with headerClassName', () => {
      beforeEach(() => {
        subject::setProps({headerClassName: 'custom-header-class'});
      });

      it('renders the header class name', () => {
        expect('.panel > .panel-header').toHaveClass('custom-header-class');
      });
    });
  });

  describe('headerCols', () => {
    beforeEach(() => {
      subject::setProps({headerCols: [
        <FlexCol>Col 1</FlexCol>,
        <FlexCol>Col 2</FlexCol>
      ]});
    });

    it('renders the header cols', () => {
      expect('.panel > .panel-header > .col').toHaveLength(2);
      expect('.panel > .panel-header > .col:eq(0)').toHaveText('Col 1');
      expect('.panel > .panel-header > .col:eq(1)').toHaveText('Col 2');
    });

    describe('with a header', () => {
      beforeEach(() => {
        subject::setProps({header: 'My Header'});
      });

      it('renders the header before the header cols', () => {
        expect('.panel > .panel-header > .col').toHaveLength(3);
        expect('.panel > .panel-header > .col:eq(0)').toHaveText('My Header');
        expect('.panel > .panel-header > .col:eq(1)').toHaveText('Col 1');
        expect('.panel > .panel-header > .col:eq(2)').toHaveText('Col 2');
      });
    });
  });

  describe('children', () => {
    beforeEach(() => {
      subject::setProps({children: 'some body'});
    });

    it('renders the body', () => {
      expect('.panel > .panel-body').toHaveText('some body');
    });

    it('does not render a loading bar', () => {
      expect('.panel > .panel-body > .panel-loading-indicator').not.toExist();
    });

    describe('with bodyClassName', () => {
      beforeEach(() => {
        subject::setProps({bodyClassName: 'custom-body-class'});
      });

      it('renders the body class name', () => {
        expect('.panel > .panel-body').toHaveClass('custom-body-class');
      });
    });

    describe('when loading', () => {
      beforeEach(() => {
        subject::setProps({loading: true});
      });

      it('renders a loading bar', () => {
        expect('.panel > .panel-body > .panel-loading-indicator').toExist();
      });
    });
  });

  describe('footer', () => {
    beforeEach(() => {
      subject::setProps({footer: 'some title'});
    });

    it('renders the footer', () => {
      expect('.panel > .panel-footer').toHaveText('some title');
      expect('.panel > .panel-footer').toHaveClass('type-ellipsis');
      expect('.panel > .panel-footer').toHaveClass('h6');
    });

    describe('with footerClassName', () => {
      beforeEach(() => {
        subject::setProps({footerClassName: 'custom-footer-class'});
      });

      it('renders the footer class name', () => {
        expect('.panel > .panel-footer').toHaveClass('custom-footer-class');
      });
    });
  });
});