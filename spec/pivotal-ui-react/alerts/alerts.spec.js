import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {setProps} from '../../support/jest-helpers';
import {SuccessAlert, InfoAlert, WarningAlert, ErrorAlert} from '../../../src/react/alerts';

describe('Alert Component', () => {
  let subject;

  describe('Success Alert', () => {
    beforeEach(() => {
      subject = ReactDOM.render(<SuccessAlert>alert body</SuccessAlert>, root);
    });

    it('renders', () => {
      expect('.pui-alert').not.toBeNull();
    });

    it('passes down the className, id, and style properties', () => {
      subject::setProps({className: 'foo', id: 'bar', style: {fontSize: '200px'}});

      expect('.pui-alert').toHaveClass('foo');
      expect('.pui-alert').toHaveAttr('id', 'bar');
      expect('.pui-alert').toHaveCss({'font-size': '200px'});
    });

    it('renders a sr-only alert description', () => {
      subject::setProps({withIcon: true});
      expect('.sr-only').toHaveText('success alert message,');
    });

    describe('when dismissable is set to true', () => {
      beforeEach(() => {
        subject::setProps({dismissable: true});
      });

      it('adds the alert-dismissable class', () => {
        expect('.pui-alert').toHaveClass('pui-alert-dismissable');
      });

      it('has a close button', () => {
        expect('.pui-alert button').toHaveLength(1);
        expect('.pui-btn-default-flat.pui-btn-icon').toHaveClass('pui-alert-close-btn');
        expect('.pui-btn-default-flat.pui-btn-icon .icon-close').toExist();
      });

      it('has an sr-only close button', () => {
        expect('.pui-alert button').toHaveLength(1);
        expect('.pui-alert button:eq(0)').toHaveAttr('aria-label');
      });

      it('adds the closeLabel to the close button', () => {
        subject::setProps({dismissable: true, closeLabel: 'click to close the alert'});
        expect('.pui-alert button:eq(0)').toHaveAttr('aria-label');
        expect($('.pui-alert button:eq(0)').attr('aria-label')).toBe('click to close the alert');
      });

      it('disappears when close button is clicked', () => {
        subject::setProps({dismissable: true});
        $('.icon-close').simulate('click');
        expect('.pui-alert').not.toExist();
      });

      describe('when onDismiss is given', () => {
        let onDismissSpy;

        beforeEach(() => {
          onDismissSpy = jasmine.createSpy('dismissable callback');
        });

        it('calls onDismiss when the close button is clicked', () => {
          subject::setProps({dismissable: true, onDismiss: onDismissSpy});
          $('.icon-close').simulate('click');
          expect(onDismissSpy).toHaveBeenCalled();
        });
      });

      describe('when show is true', () => {
        it('renders the alert even after the close button is clicked', () => {
          subject::setProps({dismissable: true, show: true});
          $('.icon-close').simulate('click');
          expect('.pui-alert').toExist();
        });

        it('hides the alert when show is set to false', () => {
          subject::setProps({dismissable: true, show: false});
          expect('.pui-alert').not.toExist();
        });
      });
    });

    describe('when dismissable is not present', () => {
      it('does not have a close button', () => {
        expect('.icon-close').not.toExist();
      });
    });

    describe('when withIcon is set to true', () => {
      beforeEach(() => {
        subject::setProps({withIcon: true});
      });

      it('renders a success alert', () => {
        expect('.pui-alert').toHaveClass('pui-alert-success');
      });

      it('renders an icon in the alert', () => {
        expect('svg').toHaveClass('icon-check_circle');
      });

      it('has a "success alert" label', () => {
        expect('.sr-only').toContainText('success');
      });
    });
  });

  describe('InfoAlert with Icon', () => {
    let subject;

    beforeEach(() => {
      subject = ReactDOM.render(<InfoAlert {...{withIcon: true}}>alert body</InfoAlert>, root);
    });

    it('renders an info alert', () => {
      expect('.pui-alert').toHaveClass('pui-alert-info');
    });

    it('renders an icon in the alert', () => {
      expect('.pui-alert svg').toExist();
      expect('.pui-alert svg').toHaveClass('icon-info');
    });

    it('has a "info alert" label', () => {
      expect('.pui-alert .sr-only').toContainText('info');
    });
  });

  describe('WarningAlert with Icon', () => {
    let subject;

    beforeEach(() => {
      subject = ReactDOM.render(<WarningAlert {...{withIcon: true}}>alert body</WarningAlert>, root);
    });

    it('renders an warning alert', () => {
      expect('.pui-alert').toHaveClass('pui-alert-warning');
    });

    it('renders an icon in the alert', () => {
      expect('.pui-alert svg').toHaveClass('icon-warning');
    });

    it('has a "warning alert" label', () => {
      expect('.pui-alert .sr-only').toContainText('warning');
    });
  });

  describe('ErrorAlert with Icon', () => {
    let subject;

    beforeEach(() => {
      subject = ReactDOM.render(<ErrorAlert {...{withIcon: true}}>alert body</ErrorAlert>, root);
    });

    it('renders an error alert', () => {
      expect('.pui-alert').toHaveClass('pui-alert-danger');
    });

    it('renders an icon in the alert', () => {
      expect('.pui-alert svg').toHaveClass('icon-report');
    });

    it('has a "error alert" label', () => {
      expect('.pui-alert .sr-only').toContainText('error');
    });
  });
});
