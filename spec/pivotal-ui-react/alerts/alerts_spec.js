import '../spec_helper';

import {SuccessAlert, InfoAlert, WarningAlert, ErrorAlert} from '../../../src/react/alerts';

describe('Alert Component', () => {
  let subject;

  describe('Success Alert', () => {
    beforeEach(() => {
      subject = ReactDOM.render(<SuccessAlert>alert body</SuccessAlert>, root);
    });

    it('renders', () => {
      expect('.alert').not.toBeNull();
    });

    it('passes down the className, id, and style properties', () => {
      subject::setProps({className: 'foo', id: 'bar', style: {fontSize: '200px'}});

      expect('.alert').toHaveClass('foo');
      expect('.alert').toHaveAttr('id', 'bar');
      expect('.alert').toHaveCss({'font-size': '200px'});
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
        expect('.alert').toHaveClass('alert-dismissable');
      });

      it('has a close button', () => {
        expect('.alert button').toHaveLength(1);
        expect('button:eq(0)').toHaveClass('close');
      });

      it('has an sr-only close button', () => {
        expect('.alert button').toHaveLength(1);
        expect('.alert button:eq(0)').toHaveAttr('aria-label');
      });

     it('adds the closeLabel to the close button', () => {
        subject::setProps({dismissable: true, closeLabel: 'click to close the alert'});
        expect('.alert button:eq(0)').toHaveAttr('aria-label');
        expect($('.alert button:eq(0)').attr('aria-label')).toBe('click to close the alert');
      });

      it('disappears when close button is clicked', () => {
        subject::setProps({dismissable: true});
        $('.icon-close').simulate('click');
        jasmine.clock().tick(1);
        expect('.alert').not.toExist();
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
          jasmine.clock().tick(1);
          expect('.alert').toExist();
        });

        it('hides the alert when show is set to false', () => {
          subject::setProps({dismissable: true, show: false});
          expect('.alert').not.toExist();
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
        expect('.alert').toHaveClass('alert-success');
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
      expect('.alert').toHaveClass('alert-info');
    });

    it('renders an icon in the alert', () => {
      expect('.alert svg').toExist();
      expect('.alert svg').toHaveClass('icon-info');
    });

    it('has a "info alert" label', () => {
      expect('.alert .sr-only').toContainText('info');
    });
  });

  describe('WarningAlert with Icon', () => {
    let subject;

    beforeEach(() => {
      subject = ReactDOM.render(<WarningAlert {...{withIcon: true}}>alert body</WarningAlert>, root);
    });

    it('renders an warning alert', () => {
      expect('.alert').toHaveClass('alert-warning');
    });

    it('renders an icon in the alert', () => {
      expect('.alert svg').toHaveClass('icon-warning');
    });

    it('has a "warning alert" label', () => {
      expect('.alert .sr-only').toContainText('warning');
    });
  });

  describe('ErrorAlert with Icon', () => {
    let subject;

    beforeEach(() => {
      subject = ReactDOM.render(<ErrorAlert {...{withIcon: true}}>alert body</ErrorAlert>, root);
    });

    it('renders an error alert', () => {
      expect('.alert').toHaveClass('alert-danger');
    });

    it('renders an icon in the alert', () => {
      expect('.alert svg').toHaveClass('icon-warning');
    });

    it('has a "error alert" label', () => {
      expect('.alert .sr-only').toContainText('error');
    });
  });
});
