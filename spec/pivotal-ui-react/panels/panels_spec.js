import '../spec_helper';
import {Panel} from '../../../src/react/panels';
import {FlexCol} from '../../../src/react/flex-grids';

describe('Panel', () => {
  let subject;

  beforeEach(() => {
    subject = shallow(<Panel/>);
  });

  it('renders a panel-container', () => {
    expect(subject.find('.pui-panel-container').exists()).toBeTruthy();
  });

  it('does not render a panel title', () => {
    expect(subject.find('.pui-panel-container > .pui-panel-title').exists()).toBeFalsy();
  });

  it('renders a panel with the expected classes', () => {
    expect(subject.find('.pui-panel-container > .pui-panel').hasClass('bg-neutral-11')).toBeTruthy();
    expect(subject.find('.pui-panel-container > .pui-panel').hasClass('box-shadow-1')).toBeTruthy();
    expect(subject.find('.pui-panel-container > .pui-panel').hasClass('border-rounded')).toBeTruthy();
  });

  it('does not render a header', () => {
    expect(subject.find('.pui-panel-header').exists()).toBeFalsy();
  });

  it('does not render a panel-body', () => {
    expect(subject.find('.pui-panel-body').exists()).toBeFalsy();
  });

  it('does not render a footer', () => {
    expect(subject.find('.pui-panel-footer').exists()).toBeFalsy();
  });

  describe('className', () => {
    beforeEach(() => {
      subject.setProps({className: 'custom-panel-container-class'});
    });

    it('renders the panel class name', () => {
      expect(subject.find('.pui-panel-container').hasClass('custom-panel-container-class')).toBeTruthy();
    });
  });

  describe('title', () => {
    beforeEach(() => {
      subject.setProps({title: 'some title'});
    });

    it('renders the title', () => {
      expect(subject.find('.pui-panel-container > .pui-panel-title > .col').at(0).text()).toBe('some title');
      expect(subject.find('.pui-panel-container > .pui-panel-title > .col').at(0).hasClass('h5')).toBeTruthy();
      expect(subject.find('.pui-panel-container > .pui-panel-title > .col').at(0).hasClass('em-high')).toBeTruthy();
      expect(subject.find('.pui-panel-container > .pui-panel-title > .col').at(0).hasClass('type-ellipsis')).toBeTruthy();
      expect(subject.find('.pui-panel-container > .pui-panel-title > .col').at(0).hasClass('col-middle')).toBeTruthy();
    });

    describe('with titleClassName', () => {
      beforeEach(() => {
        subject.setProps({titleClassName: 'custom-title-class'});
      });

      it('renders the title class name', () => {
        expect(subject.find('.pui-panel-container > .pui-panel-title').hasClass('custom-title-class')).toBeTruthy();
      });
    });
  });

  describe('titleCols', () => {
    beforeEach(() => {
      subject.setProps({titleCols: [
        <FlexCol>Col 1</FlexCol>,
        <FlexCol>Col 2</FlexCol>
      ]});
    });

    it('renders the title cols', () => {
      expect('.pui-panel-container > .pui-panel-title > .col').toHaveLength(2);
      expect(subject.find('.pui-panel-container > .pui-panel-title > .col').at(0).text()).toBe('Col 1');
      expect(subject.find('.pui-panel-container > .pui-panel-title > .col').at(1).text()).toBe('Col 2');
    });

    describe('with a title', () => {
      beforeEach(() => {
        subject.setProps({title: 'My Title'});
      });

      it('renders the title before the title cols', () => {
        expect('.pui-panel-container > .pui-panel-title > .col').toHaveLength(3);
        expect(subject.find('.pui-panel-container > .pui-panel-title > .col').at(0).text()).toBe('My Title');
        expect(subject.find('.pui-panel-container > .pui-panel-title > .col').at(1).text()).toBe('Col 1');
        expect(subject.find('.pui-panel-container > .pui-panel-title > .col').at(2).text()).toBe('Col 2');
      });
    });
  });

  describe('panelClassName', () => {
    beforeEach(() => {
      subject.setProps({panelClassName: 'custom-panel-class'});
    });

    it('renders the panel class name', () => {
      expect(subject.find('.pui-panel').hasClass('custom-panel-class')).toBeTruthy();
    });
  });

  describe('header', () => {
    beforeEach(() => {
      subject.setProps({header: 'some header'});
    });

    it('renders the header', () => {
      expect(subject.find('.pui-panel > .pui-panel-header > .col').at(0).text()).toBe('some header');
      expect(subject.find('.pui-panel > .pui-panel-header > .col').at(0).hasClass('type-ellipsis')).toBeTruthy();
      expect(subject.find('.pui-panel > .pui-panel-header > .col').at(0).hasClass('em-high')).toBeTruthy();
      expect(subject.find('.pui-panel > .pui-panel-header > .col').at(0).hasClass('col-middle')).toBeTruthy();
    });

    describe('with headerClassName', () => {
      beforeEach(() => {
        subject.setProps({headerClassName: 'custom-header-class'});
      });

      it('renders the header class name', () => {
        expect(subject.find('.pui-panel > .pui-panel-header').hasClass('custom-header-class')).toBeTruthy();
      });
    });
  });

  describe('headerCols', () => {
    beforeEach(() => {
      subject.setProps({headerCols: [
        <FlexCol>Col 1</FlexCol>,
        <FlexCol>Col 2</FlexCol>
      ]});
    });

    it('renders the header cols', () => {
      expect('.pui-panel > .pui-panel-header > .col').toHaveLength(2);
      expect(subject.find('.pui-panel > .pui-panel-header > .col').at(0).text()).toBe('Col 1');
      expect(subject.find('.pui-panel > .pui-panel-header > .col').at(1).text()).toBe('Col 2');
    });

    describe('with a header', () => {
      beforeEach(() => {
        subject.setProps({header: 'My Header'});
      });

      it('renders the header before the header cols', () => {
        expect('.pui-panel > .pui-panel-header > .col').toHaveLength(3);
        expect(subject.find('.pui-panel > .pui-panel-header > .col').at(0).text()).toBe('My Header');
        expect(subject.find('.pui-panel > .pui-panel-header > .col').at(1).text()).toBe('Col 1');
        expect(subject.find('.pui-panel > .pui-panel-header > .col').at(2).text()).toBe('Col 2');
      });
    });
  });

  describe('children', () => {
    beforeEach(() => {
      subject.setProps({children: 'some body'});
    });

    it('renders the body', () => {
      expect(subject.find('.pui-panel > .pui-panel-body').text()).toBe('some body');
    });

    it('does not render a loading bar', () => {
      expect(subject.find('.pui-panel > .pui-panel-body > .pui-panel-loading-indicator').exists()).toBeFalsy();
    });

    describe('with bodyClassName', () => {
      beforeEach(() => {
        subject.setProps({bodyClassName: 'custom-body-class'});
      });

      it('renders the body class name', () => {
        expect(subject.find('.pui-panel > .pui-panel-body').hasClass('custom-body-class')).toBeTruthy();
      });
    });

    describe('when loading', () => {
      beforeEach(() => {
        subject.setProps({loading: true});
      });

      it('renders a loading bar', () => {
        expect(subject.find('.pui-panel > .pui-panel-body > .pui-panel-loading-indicator').exists()).toBeTruthy();
      });
    });
  });

  describe('footer', () => {
    beforeEach(() => {
      subject.setProps({footer: 'some title'});
    });

    it('renders the footer', () => {
      expect(subject.find('.pui-panel > .pui-panel-footer').text()).toBe('some title');
      expect(subject.find('.pui-panel > .pui-panel-footer').hasClass('type-ellipsis')).toBeTruthy();
      expect(subject.find('.pui-panel > .pui-panel-footer').hasClass('h6')).toBeTruthy();
    });

    describe('with footerClassName', () => {
      beforeEach(() => {
        subject.setProps({footerClassName: 'custom-footer-class'});
      });

      it('renders the footer class name', () => {
        expect(subject.find('.pui-panel > .pui-panel-footer').hasClass('custom-footer-class')).toBeTruthy();
      });
    });
  });
});