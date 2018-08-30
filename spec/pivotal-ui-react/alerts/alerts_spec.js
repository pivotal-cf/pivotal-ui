import '../spec_helper';

import {SuccessAlert, InfoAlert, WarningAlert, ErrorAlert} from '../../../src/react/alerts';

describe('Alert Component', () => {
  let subject;

  describe('Success Alert', () => {
    beforeEach(() => {
      subject = shallow(<SuccessAlert>alert body</SuccessAlert>);
    });

    it('renders', () => {
      expect('.pui-alert').not.toBeNull();
    });

    it('passes down the className, id, and style properties', () => {
      subject.setProps({className: 'foo', id: 'bar', style: {fontSize: '200px'}});

      expect(subject.find('.pui-alert').hasClass('foo')).toBeTruthy();
      expect(subject.find('.pui-alert').prop('id')).toBe('bar');
      expect(subject.find('.pui-alert').prop('style')).toEqual({'font-size': '200px'});
    });

    it('renders a sr-only alert description', () => {
      subject.setProps({withIcon: true});
      expect(subject.find('.sr-only').text()).toBe('success alert message,');
    });

    describe('when dismissable is set to true', () => {
      beforeEach(() => {
        subject.setProps({dismissable: true});
      });

      it('adds the alert-dismissable class', () => {
        expect(subject.find('.pui-alert').hasClass('pui-alert-dismissable')).toBeTruthy();
      });

      it('has a close button', () => {
        expect('.pui-alert button').toHaveLength(1);
        expect(subject.find('.pui-btn-default-flat.pui-btn-icon').hasClass('pui-alert-close-btn')).toBeTruthy();
        expect(subject.find('.pui-btn-default-flat.pui-btn-icon .icon-close').exists()).toBeTruthy();
      });

      it('has an sr-only close button', () => {
        expect('.pui-alert button').toHaveLength(1);
        expect(subject.find('.pui-alert button').at(0).prop('aria-label')).toBeTruthy();
      });

      it('adds the closeLabel to the close button', () => {
        subject.setProps({dismissable: true, closeLabel: 'click to close the alert'});
        expect(subject.find('.pui-alert button').at(0).prop('aria-label')).toBeTruthy();
        expect(subject.find('.pui-alert button').at(0).attr('aria-label')).toBe('click to close the alert');
      });

      it('disappears when close button is clicked', () => {
        subject.setProps({dismissable: true});
        subject.find('.icon-close').simulate('click');
        expect(subject.find('.pui-alert').exists()).toBeFalsy();
      });

      describe('when onDismiss is given', () => {
        let onDismissSpy;

        beforeEach(() => {
          onDismissSpy = jest.fn().mockName('dismissable callback');
        });

        it('calls onDismiss when the close button is clicked', () => {
          subject.setProps({dismissable: true, onDismiss: onDismissSpy});
          subject.find('.icon-close').simulate('click');
          expect(onDismissSpy).toHaveBeenCalled();
        });
      });

      describe('when show is true', () => {
        it('renders the alert even after the close button is clicked', () => {
          subject.setProps({dismissable: true, show: true});
          subject.find('.icon-close').simulate('click');
          expect(subject.find('.pui-alert').exists()).toBeTruthy();
        });

        it('hides the alert when show is set to false', () => {
          subject.setProps({dismissable: true, show: false});
          expect(subject.find('.pui-alert').exists()).toBeFalsy();
        });
      });
    });

    describe('when dismissable is not present', () => {
      it('does not have a close button', () => {
        expect(subject.find('.icon-close').exists()).toBeFalsy();
      });
    });

    describe('when withIcon is set to true', () => {
      beforeEach(() => {
        subject.setProps({withIcon: true});
      });

      it('renders a success alert', () => {
        expect(subject.find('.pui-alert').hasClass('pui-alert-success')).toBeTruthy();
      });

      it('renders an icon in the alert', () => {
        expect(subject.find('svg').hasClass('icon-check_circle')).toBeTruthy();
      });

      it('has a "success alert" label', () => {
        expect(subject.find('.sr-only').text()).toContain('success');
      });
    });
  });

  describe('InfoAlert with Icon', () => {
    let subject;

    beforeEach(() => {
      subject = shallow(<InfoAlert {...{withIcon: true}}>alert body</InfoAlert>);
    });

    it('renders an info alert', () => {
      expect(subject.find('.pui-alert').hasClass('pui-alert-info')).toBeTruthy();
    });

    it('renders an icon in the alert', () => {
      expect(subject.find('.pui-alert svg').exists()).toBeTruthy();
      expect(subject.find('.pui-alert svg').hasClass('icon-info')).toBeTruthy();
    });

    it('has a "info alert" label', () => {
      expect(subject.find('.pui-alert .sr-only').text()).toContain('info');
    });
  });

  describe('WarningAlert with Icon', () => {
    let subject;

    beforeEach(() => {
      subject = shallow(<WarningAlert {...{withIcon: true}}>alert body</WarningAlert>);
    });

    it('renders an warning alert', () => {
      expect(subject.find('.pui-alert').hasClass('pui-alert-warning')).toBeTruthy();
    });

    it('renders an icon in the alert', () => {
      expect(subject.find('.pui-alert svg').hasClass('icon-warning')).toBeTruthy();
    });

    it('has a "warning alert" label', () => {
      expect(subject.find('.pui-alert .sr-only').text()).toContain('warning');
    });
  });

  describe('ErrorAlert with Icon', () => {
    let subject;

    beforeEach(() => {
      subject = shallow(<ErrorAlert {...{withIcon: true}}>alert body</ErrorAlert>);
    });

    it('renders an error alert', () => {
      expect(subject.find('.pui-alert').hasClass('pui-alert-danger')).toBeTruthy();
    });

    it('renders an icon in the alert', () => {
      expect(subject.find('.pui-alert svg').hasClass('icon-report')).toBeTruthy();
    });

    it('has a "error alert" label', () => {
      expect(subject.find('.pui-alert .sr-only').text()).toContain('error');
    });
  });
});
