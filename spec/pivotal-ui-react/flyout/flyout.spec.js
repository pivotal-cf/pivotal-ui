import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {setProps} from '../../support/jest-helpers';
import {spyOnRender} from '../../support/jest_spy_on_render';
import {Flyout} from '../../../src/react/flyout';
import {Icon} from '../../../src/react/iconography';
import {Dialog} from '../../../src/react/dialog';

jest.mock('../../../src/react/dialog', () => ({
  Dialog: jest.fn(props => <div>{props.children}</div>)
}));

describe('Flyout', () => {
  let onHide, children, header, subject;

  beforeEach(() => {
    spyOnRender(Icon);

    onHide = jasmine.createSpy('onHide');
    children = (<div>some-flyout-body</div>);
    header = (<div>some-flyout-header</div>);
    subject = ReactDOM.render((
      <Flyout {...{
        animationDuration: 0,
        animationEasing: 'linear',
        children,
        dialogClassName: 'some-dialog-class',
        header,
        iconSrc: 'chevron_left',
        onHide,
        show: true,
        width: '100px'
      }}/>
    ), root);
  });

  it('renders a Dialog', () => {
    expect(Dialog).toHaveBeenCalledWith({
      show: true,
      onHide,
      animationDuration: 0,
      animationEasing: 'linear',
      className: 'pui-flyout-dialog-backdrop',
      dialogClassName: 'some-dialog-class pui-flyout-dialog',
      children: jasmine.any(Object),
      hideOnBackdropClick: false,
      hideOnEscKeyDown: false,
      width: '100px',
      updateParentZIndex: true
    }, expect.anything(), expect.anything());
  });

  it('renders an icon button', () => {
    expect('.pui-flyout-icon-btn').toHaveClass('pui-btn-default-flat');
    expect('.pui-flyout-icon-btn').toHaveClass('pui-btn-icon');
    expect('.pui-flyout-icon-btn').toHaveAttr('aria-label', 'Close');
    expect(Icon).toHaveBeenRenderedWithProps({
      src: 'chevron_left',
      size: 'inherit',
      style: {},
      verticalAlign: 'middle'
    });
  });

  it('renders the children', () => {
    expect('.pui-flyout-body').toHaveText('some-flyout-body');
  });

  describe('bodyClassName', () => {
    beforeEach(() => {
      subject::setProps({bodyClassName: 'some-class-name'});
    });

    it('sets the given className on the body', () => {
      expect('.pui-flyout-body').toHaveClass('some-class-name');
    });
  });

  describe('buttonAriaLabel', () => {
    beforeEach(() => {
      subject::setProps({buttonAriaLabel: 'Back'});
    });

    it('sets the aria-label on the icon button accordingly', () => {
      expect('.pui-flyout-icon-btn').toHaveAttr('aria-label', 'Back');
    });
  });

  describe('header', () => {
    describe('with a headerClassName prop', () => {
      beforeEach(() => {
        subject::setProps({headerClassName: 'pan'});
      });

      it('sets the given className on the header', () => {
        expect('.pui-flyout-header').toHaveClass('pan');
      });
    });

    describe('when clicking the icon button', () => {
      beforeEach(() => {
        $('.pui-flyout-icon-btn').simulate('click');
      });

      it('calls the onHide callback', () => {
        expect(onHide).toHaveBeenCalledWith(jasmine.any(Object));
      });
    });

    it('renders a header', () => {
      expect('.pui-flyout-header .col:eq(1)').toHaveText('some-flyout-header');
    });

    describe('when an icon src is provided', () => {
      let iconSrc;
      beforeEach(() => {
        iconSrc = 'arrow_back';
        subject::setProps({iconSrc});
      });

      it('renders that icon instead of the close icon', () => {
        expect(Icon).toHaveBeenRenderedWithProps({
          src: 'arrow_back',
          size: 'inherit',
          style: {},
          verticalAlign: 'middle'
        });
      });
    });
  });
});