import React from 'react';
import ReactDOM from 'react-dom';
import {setProps} from '../../support/jest-helpers';
import {Panel} from '../../../src/react/panels';
import {FlexCol} from '../../../src/react/flex-grids';

describe('Panel', () => {
  let subject;

  beforeEach(() => {
    subject = ReactDOM.render(<Panel/>, root);
  });

  it('renders a panel-container', () => {
    expect('section.pui-panel-container').toExist();
  });

  it('does not render a panel title', () => {
    expect('section.pui-panel-container > .pui-panel-title').not.toExist();
  });

  it('renders a panel with the expected classes', () => {
    expect('section.pui-panel-container > .pui-panel').toHaveClass('bg-white');
    expect('section.pui-panel-container > .pui-panel').toHaveClass('box-shadow-1');
    expect('section.pui-panel-container > .pui-panel').toHaveClass('border-rounded');
  });

  it('does not render a header', () => {
    expect('.pui-panel-header').not.toExist();
  });

  it('does not render a panel-body', () => {
    expect('.pui-panel-body').not.toExist();
  });

  it('does not render a footer', () => {
    expect('.pui-panel-footer').not.toExist();
  });

  describe('className', () => {
    beforeEach(() => {
      subject::setProps({className: 'custom-panel-container-class'});
    });

    it('renders the panel class name', () => {
      expect('section.pui-panel-container').toHaveClass('custom-panel-container-class');
    });
  });

  describe('title', () => {
    beforeEach(() => {
      subject::setProps({title: 'some title'});
    });

    it('renders the title', () => {
      expect('section.pui-panel-container > .pui-panel-title > .col:eq(0)').toHaveText('some title');
      expect('section.pui-panel-container > .pui-panel-title > .col:eq(0)').toHaveClass('h5');
      expect('section.pui-panel-container > .pui-panel-title > .col:eq(0)').toHaveClass('em-high');
      expect('section.pui-panel-container > .pui-panel-title > .col:eq(0)').toHaveClass('type-ellipsis');
      expect('section.pui-panel-container > .pui-panel-title > .col:eq(0)').toHaveClass('col-middle');
    });

    describe('with titleClassName', () => {
      beforeEach(() => {
        subject::setProps({titleClassName: 'custom-title-class'});
      });

      it('renders the title class name', () => {
        expect('section.pui-panel-container > .pui-panel-title').toHaveClass('custom-title-class');
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
      expect('section.pui-panel-container > .pui-panel-title > .col').toHaveLength(2);
      expect('section.pui-panel-container > .pui-panel-title > .col:eq(0)').toHaveText('Col 1');
      expect('section.pui-panel-container > .pui-panel-title > .col:eq(1)').toHaveText('Col 2');
    });

    describe('with a title', () => {
      beforeEach(() => {
        subject::setProps({title: 'My Title'});
      });

      it('renders the title before the title cols', () => {
        expect('section.pui-panel-container > .pui-panel-title > .col').toHaveLength(3);
        expect('section.pui-panel-container > .pui-panel-title > .col:eq(0)').toHaveText('My Title');
        expect('section.pui-panel-container > .pui-panel-title > .col:eq(1)').toHaveText('Col 1');
        expect('section.pui-panel-container > .pui-panel-title > .col:eq(2)').toHaveText('Col 2');
      });
    });
  });

  describe('panelClassName', () => {
    beforeEach(() => {
      subject::setProps({panelClassName: 'custom-panel-class'});
    });

    it('renders the panel class name', () => {
      expect('.pui-panel').toHaveClass('custom-panel-class');
    });
  });

  describe('header', () => {
    beforeEach(() => {
      subject::setProps({
        header: <ul>
          <li>some</li>
          <li>complex</li>
          <li>header</li>
        </ul>
      });
    });

    it('renders the header', () => {
      expect('.pui-panel > .pui-panel-header > .col:eq(0) li:eq(0)').toHaveText('some');
      expect('.pui-panel > .pui-panel-header > .col:eq(0) li:eq(1)').toHaveText('complex');
      expect('.pui-panel > .pui-panel-header > .col:eq(0) li:eq(2)').toHaveText('header');
      expect('.pui-panel > .pui-panel-header > .col:eq(0)').toHaveClass('type-ellipsis');
      expect('.pui-panel > .pui-panel-header > .col:eq(0)').toHaveClass('em-high');
      expect('.pui-panel > .pui-panel-header > .col:eq(0)').toHaveClass('col-middle');
    });

    describe('with headerClassName', () => {
      beforeEach(() => {
        subject::setProps({headerClassName: 'custom-header-class'});
      });

      it('renders the header class name', () => {
        expect('.pui-panel > .pui-panel-header').toHaveClass('custom-header-class');
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
      expect('.pui-panel > .pui-panel-header > .col').toHaveLength(2);
      expect('.pui-panel > .pui-panel-header > .col:eq(0)').toHaveText('Col 1');
      expect('.pui-panel > .pui-panel-header > .col:eq(1)').toHaveText('Col 2');
    });

    describe('with a header', () => {
      beforeEach(() => {
        subject::setProps({header: 'My Header'});
      });

      it('renders the header before the header cols', () => {
        expect('.pui-panel > .pui-panel-header > .col').toHaveLength(3);
        expect('.pui-panel > .pui-panel-header > .col:eq(0)').toHaveText('My Header');
        expect('.pui-panel > .pui-panel-header > .col:eq(1)').toHaveText('Col 1');
        expect('.pui-panel > .pui-panel-header > .col:eq(2)').toHaveText('Col 2');
      });
    });
  });

  describe('children', () => {
    beforeEach(() => {
      subject::setProps({children: 'some body'});
    });

    it('renders the body', () => {
      expect('.pui-panel > .pui-panel-body').toHaveText('some body');
    });

    it('does not render a loading bar', () => {
      expect('.pui-panel > .pui-panel-body > .pui-panel-loading-indicator').not.toExist();
    });

    describe('with bodyClassName', () => {
      beforeEach(() => {
        subject::setProps({bodyClassName: 'custom-body-class'});
      });

      it('renders the body class name', () => {
        expect('.pui-panel > .pui-panel-body').toHaveClass('custom-body-class');
      });
    });

    describe('when loading', () => {
      beforeEach(() => {
        subject::setProps({loading: true});
      });

      it('renders a loading bar', () => {
        expect('.pui-panel .pui-panel-loading-indicator').toExist();
      });
    });
  });

  describe('footer', () => {
    beforeEach(() => {
      subject::setProps({footer: 'some title'});
    });

    it('renders the footer', () => {
      expect('.pui-panel > .pui-panel-footer').toHaveText('some title');
      expect('.pui-panel > .pui-panel-footer').toHaveClass('type-ellipsis');
      expect('.pui-panel > .pui-panel-footer').toHaveClass('h6');
    });

    describe('with footerClassName', () => {
      beforeEach(() => {
        subject::setProps({footerClassName: 'custom-footer-class'});
      });

      it('renders the footer class name', () => {
        expect('.pui-panel > .pui-panel-footer').toHaveClass('custom-footer-class');
      });
    });
  });
});