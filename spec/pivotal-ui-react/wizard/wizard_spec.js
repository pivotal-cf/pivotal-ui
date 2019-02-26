import '../spec_helper';
import {Wizard} from '../../../src/react/wizard';

describe('Wizard', () => {
  let finish, pages, subject, nextEnabled;

  beforeEach(() => {
    finish = jasmine.createSpy('finish');
    nextEnabled = jasmine.createSpy('nextEnabled');
    nextEnabled.and.returnValue(true);
    pages = [{
      render: jasmine.createSpy('pageOneRender').and.returnValue((<div className="wizard-page-one">pageOne</div>)),
      nextEnabled
    }, {
      render: jasmine.createSpy('pageTwoRender').and.returnValue((<div className="wizard-page-two">pageTwo</div>))
    }];
    subject = ReactDOM.render(<Wizard {...{finish, pages}}/>, root);
  });

  describe('#getPage', () => {
    beforeEach(() => {
      subject.state.currentPage = 5;
    });

    it('gets the page', () => {
      expect(subject.getPage()).toBe(5);
    });
  });

  describe('#setPage', () => {
    describe('valid page', () => {
      beforeEach(() => {
        subject.setPage(1);
      });

      it('gets the page', () => {
        expect(subject.state.currentPage).toBe(1);
      });
    });

    describe('invalid page (too low)', () => {
      beforeEach(() => {
        subject.setPage(-1);
      });

      it('gets the page', () => {
        expect(subject.state.currentPage).toBe(0);
      });
    });

    describe('invalid page (too high)', () => {
      beforeEach(() => {
        subject.setPage(5);
      });

      it('gets the page', () => {
        expect(subject.state.currentPage).toBe(1);
      });
    });
  });

  describe('#onClickCancel', () => {
    let cancel;

    beforeEach(() => {
      cancel = jasmine.createSpy('cancel');
      subject::setProps({cancel});
      subject.onClickCancel();
    });

    it('calls the cancel callback', () => {
      expect(cancel).toHaveBeenCalledWith();
    });
  });

  describe('#onClickBack', () => {
    beforeEach(() => {
      subject.state.currentPage = 1;
    });

    describe('without custom onClickBack', () => {
      beforeEach(() => {
        subject.onClickBack();
      });

      it('goes back one page', () => {
        expect(subject.state.currentPage).toBe(0);
      });
    });

    describe('with custom onClickBack', () => {
      let onClickBack;

      beforeEach(() => {
        onClickBack = jasmine.createSpy('onClickBack');
        onClickBack.and.returnValue(0);
        pages.push({
          render: jasmine.createSpy('pageThreeRender'),
          onClickBack
        });
        subject::setProps({pages});
        subject.setState({currentPage: 2});
        subject.onClickBack();
      });

      it('renders third page', () => {
        expect(pages[2].render).toHaveBeenCalledWith({
          onClickNext: subject.onClickNext,
          setPage: subject.setPage,
          getPage: subject.getPage
        });
      });

      it('calls onClickBack callback', () => {
        expect(onClickBack).toHaveBeenCalledWith();
      });

      it('goes back one page', () => {
        expect(subject.state.currentPage).toBe(0);
      });
    });

    describe('when "backComponent" is provided', () => {
      let onClickBack;

      beforeEach(() => {
        onClickBack = jasmine.createSpy('onClickBack');
        pages.push({
          render: jasmine.createSpy('pageThreeRender'),
          onClickBack,
          backComponent: <button className="some-back-button"/>
        });
        subject::setProps({pages});
        subject.setState({currentPage: 2});
      });

      it('renders the back component', () => {
        expect('.wizard .wizard-footer .col:eq(0) .some-back-button').toExist();
      });

      it('does not render the back button', () => {
        expect('.wizard-back-btn').not.toExist();
      });

      describe('when clicking the back component', () => {
        beforeEach(() => {
          $('.wizard .wizard-footer .col:eq(0) .some-back-button').simulate('click');
        });

        it('does not call the back callback', () => {
          expect(onClickBack).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe('#onClickNext', () => {
    describe('without custom onClickNext', () => {
      beforeEach(() => {
        subject.onClickNext();
      });

      it('advances internal state to the next page', () => {
        expect(subject.state.currentPage).toBe(1);
      });
    });

    describe('with custom onClickNext', () => {
      let onClickNext;

      beforeEach(() => {
        onClickNext = jasmine.createSpy('onClickNext');
        pages.push({
          render: jasmine.createSpy('pageThreeRender'),
          onClickNext
        });
        pages.push({
          render: jasmine.createSpy('pageFourRender')
        });
        subject::setProps({pages});
        subject.setState({currentPage: pages.length - 2});
        subject.onClickNext();
      });

      it('calls onClickNext callback', () => {
        expect(onClickNext).toHaveBeenCalledWith();
      });

      it('advances internal state to the next page', () => {
        expect(subject.state.currentPage).toBe(pages.length - 1);
      });

      it('renders the fourth page', () => {
        expect(pages[pages.length - 1].render).toHaveBeenCalledWith({
          onClickNext: subject.onClickNext,
          setPage: subject.setPage,
          getPage: subject.getPage
        });
      });
    });
  });

  describe('#onClickFinish', () => {
    beforeEach(() => {
      subject.setState({currentPage: 1});
      subject.onClickFinish();
    });

    it('calls the finish callback', () => {
      expect(finish).toHaveBeenCalledWith();
    });
  });

  describe('when on the first page', () => {
    it('renders the first page', () => {
      expect(pages[0].render).toHaveBeenCalledWith({
        onClickNext: subject.onClickNext,
        setPage: subject.setPage,
        getPage: subject.getPage
      });
      expect('.wizard-page-one').toExist();
    });

    it('does not render a cancel button', () => {
      expect('.wizard-cancel-btn').not.toExist();
    });

    describe('with cancel callback', () => {
      let cancel;

      beforeEach(() => {
        cancel = jasmine.createSpy('cancel');
        subject::setProps({cancel});
      });

      it('renders a cancel button', () => {
        expect('.wizard-cancel-btn.pui-btn--primary.pui-btn--alt').toHaveText('Cancel');
      });

      describe('with custom cancel text', () => {
        beforeEach(() => {
          subject::setProps({cancelText: 'Close'});
        });

        it('renders a cancel button with custom text', () => {
          expect('.wizard-cancel-btn.pui-btn--primary.pui-btn--alt').toHaveText('Close');
        });
      });
    });

    it('does not render a back button', () => {
      expect('.wizard-back-btn').not.toExist();
    });

    it('renders a "next" PrimaryButton', () => {
      expect('.wizard-next-btn.pui-btn--primary').toHaveText('Next');
    });

    it('checks if the next button is enabled', () => {
      expect(pages[0].nextEnabled).toHaveBeenCalledWith(subject.getPage);
    });

    describe('when clicking the next button', () => {
      beforeEach(() => {
        $('.wizard-next-btn').simulate('click');
      });

      it('renders the next page', () => {
        expect('.wizard-page-one').not.toExist();
        expect('.wizard-page-two').toExist();
        expect(subject.state.currentPage).toEqual(1);
      });
    });

    describe('when hiding the "next" button', () => {
      beforeEach(() => {
        pages[0].hideNextButton = true;
        subject.forceUpdate();
      });

      it('does not render the next button', () => {
        expect('.wizard-next-btn.pui-btn--primary').not.toExist();
      });
    });

    describe('with custom next text', () => {
      beforeEach(() => {
        pages[0].nextText = () => 'customNext';
        subject.forceUpdate();
      });

      it('renders the custom text', () => {
        expect('.wizard-next-btn.pui-btn--primary').toHaveText('customNext');
      });
    });

    describe('when the "enableNext" is false', () => {
      beforeEach(() => {
        nextEnabled.and.returnValue(false);
        subject.forceUpdate();
      });

      it('moving to the next page is disabled', () => {
        $('.wizard-next-btn').simulate('click');
        expect(subject.state.currentPage).toBe(0);
      });

      it('disables the "next" button', () => {
        expect('.wizard-next-btn.pui-btn--primary').toHaveAttr('disabled');
      });
    });
  });

  describe('when on the last page', () => {
    beforeEach(() => {
      subject.setState({currentPage: pages.length - 1});
    });

    it('renders a "finish" PrimaryButton', () => {
      expect('.wizard-finish-btn.pui-btn--primary').toHaveText('Finish');
    });

    describe('when "hideFinishButton" is true', () => {
      beforeEach(() => {
        const lastPage = pages[pages.length - 1];
        pages[pages.length - 1] = {...lastPage, hideFinishButton: true};
        subject.forceUpdate();
      });

      it('does not render a "finish" Button', () => {
        expect('.wizard-finish-btn').not.toExist();
      });
    });

    describe('when "hideBackButton" is true', () => {
      beforeEach(() => {
        const lastPage = pages[pages.length - 1];
        pages[pages.length - 1] = {...lastPage, hideBackButton: true};
        subject.forceUpdate();
      });

      it('does not render a "back" Button', () => {
        expect('.wizard-back-btn').not.toExist();
      });
    });

    it('does not render a "next" PrimaryButton', () => {
      expect('.wizard-next-btn.pui-btn--primary').not.toExist();
    });

    it('renders a "back" alt PrimaryButton', () => {
      expect('.wizard-back-btn.pui-btn--primary.pui-btn--alt').toHaveText('Back');
    });

    describe('when clicking the "back" button', () => {
      beforeEach(() => {
        $('.wizard-back-btn').simulate('click');
      });

      it('renders the previous page', () => {
        expect('.wizard-page-one').toExist();
        expect('.wizard-page-two').not.toExist();
        expect(subject.state.currentPage).toEqual(0);
      });
    });

    describe('with custom finish text', () => {
      beforeEach(() => {
        subject::setProps({finishText: 'customFinish'});
      });

      it('renders the custom text', () => {
        expect('.wizard-finish-btn.pui-btn--primary').toHaveText('customFinish');
      });
    });

    describe('when finish button is clicked', () => {
      let finish;

      beforeEach(() => {
        finish = jasmine.createSpy('finish');
        subject::setProps({
          finish
        });
        $('.wizard-finish-btn').simulate('click');
      });

      it('calls custom finish function', () => {
        expect(finish).toHaveBeenCalledWith();
      });
    });

    describe('when "saving" is true and savingText is provided', () => {
      beforeEach(() => {
        subject::setProps({saving: true, savingText: 'Creating'});
      });

      it('renders a spinner', () => {
        expect('.wizard-finish-btn .icon-spinner-sm').toExist();
      });

      it('changes the button text to savingText', () => {
        expect('.wizard-finish-btn').toContainText('Creating');
      });

      it('disables the back button', () => {
        expect('.wizard-back-btn').toHaveAttr('disabled');
      });
    });

    describe('when "saving" is true and savingText is not provided', () => {
      beforeEach(() => {
        subject::setProps({saving: true});
      });

      it('changes the button text to the default saving text', () => {
        expect('.wizard-finish-btn').toContainText('Saving');
      });
    });

    describe('when "saving" is false', () => {
      it('does not render a spinner', () => {
        expect('.wizard-finish-btn .icon-spinner-sm').not.toExist();
      });

      it('does not change the button text', () => {
        expect('.wizard-finish-btn').toContainText('Finish');
      });

      it('does not disable the back button', () => {
        expect('.wizard-back-btn').not.toHaveAttr('disabled');
      });
    });

    describe('when "finishComponent" is provided', () => {
      beforeEach(() => {
        pages[pages.length - 1].finishComponent = <button className="some-custom-button"/>;
        subject.forceUpdate();
      });

      it('renders the finish component', () => {
        expect('.wizard .wizard-footer .col:eq(1) .some-custom-button').toExist();
      });

      it('does not render the finish button', () => {
        expect('.wizard-finish-btn').not.toExist();
      });

      describe('when clicking the finish component', () => {
        beforeEach(() => {
          $('.wizard .wizard-footer .col:eq(1) .some-custom-button').simulate('click');
        });

        it('does not call the finish callback', () => {
          expect(finish).not.toHaveBeenCalled();
        });
      });
    });
  });
});