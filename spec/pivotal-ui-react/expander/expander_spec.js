import '../spec_helper';
import {Collapsible} from '../../../src/react/collapsible';
import {ExpanderContent, ExpanderTrigger} from '../../../src/react/expander';
import {findByClass, findByTag, clickOn} from '../spec_helper';

describe('ExpanderContent', () => {
  let subject, children;
  const renderIntoDom = props => subject = shallow(<ExpanderContent {...props}>
    {children}
  </ExpanderContent>);

  describe('when expanded is unset', () => {
    it('hides the content', () => {
      const result = renderIntoDom({expanded: false});
      expect(result.find(Collapsible).props()).toEqual({expanded: false, children});
    });
  });

  describe('when expanded is set to false', () => {
    it('hides the content', () => {
      const result = renderIntoDom({expanded: false});
      expect(result.find(Collapsible).props()).toEqual({expanded: false, children});
    });
  });

  describe('when expanded is set to true', () => {
    it('shows the content', () => {
      const result = renderIntoDom({expanded: true});
      expect(result.find(Collapsible).props()).toEqual({expanded: true, children});
    });
  });

  describe('#toggle', () => {
    let onExitedSpy, onEnteredSpy, expanderContent;

    describe('when the content was already visible', () => {
      beforeEach(() => {
        onExitedSpy = jest.fn().mockName('on exited');
        expanderContent = renderIntoDom({expanded: true, onExited: onExitedSpy, delay: 0});
        expanderContent.instance().instance().toggle();
      });

      it('hides the content', () => {
        expect(expanderContent.find(Collapsible).props()).toEqual({
          expanded: false,
          delay: 0,
          children,
          onExited: onExitedSpy
        });
      });
    });

    describe('when the content is not visible', () => {
      beforeEach(() => {
        onEnteredSpy = jest.fn().mockName('onEntered');
        expanderContent = renderIntoDom({expanded: false, onEntered: onEnteredSpy, delay: 0});
        expanderContent.instance().instance().toggle();
      });

      it('shows the content', () => {
        expect(expanderContent.find(Collapsible).props()).toEqual({
          expanded: true,
          delay: 0,
          children,
          onEntered: onEnteredSpy
        });
      });
    });

    it('can be invoked ad nauseum', () => {
      expanderContent = renderIntoDom({expanded: false, delay: 0});
      expanderContent.instance().instance().toggle();
      expect(expanderContent.find(Collapsible).props()).toEqual({expanded: true, delay: 0, children});
      expanderContent.instance().instance().toggle();
      expect(expanderContent.find(Collapsible).props()).toEqual({expanded: false, delay: 0, children});
      expanderContent.instance().instance().toggle();
      expect(expanderContent.find(Collapsible).props()).toEqual({expanded: true, delay: 0, children});
    });
  });
});

describe('ExpanderTrigger', () => {
  let subject;
  const renderComponent = props => subject = shallow(<ExpanderTrigger>
    <button>Click here to trigger</button>
  </ExpanderTrigger>);

  let expanderTrigger;

  describe('on click', () => {
    describe('when target is set on state', () => {
      let expanderContent;
      beforeEach(() => {
        expanderContent = {
          toggle: jest.fn().mockName('toggle')
        };
        expanderTrigger = renderComponent();
        expanderTrigger.instance().instance().setTarget(expanderContent);
      });

      it('invokes the #toggle method on the provided target', () => {
        expanderTrigger.find('button').simulate('click', fakeEvent);
        expect(expanderContent.toggle).toHaveBeenCalled();
      });
    });

    describe('when target is not set on state', () => {
      it('warns the user that no ExpanderContent was provided', () => {
        spyOn(console, 'warn');

        expanderTrigger = renderComponent();
        expanderTrigger.find('button').simulate('click', fakeEvent);

        expect(console.warn).toHaveBeenCalledWith('No ExpanderContent provided to ExpanderTrigger.');
      });
    });
  });
});
