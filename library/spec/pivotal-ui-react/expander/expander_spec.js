import '../spec_helper';
import {Collapsible} from 'pui-react-collapsible';
import {ExpanderContent, ExpanderTrigger} from 'pui-react-expander';
import {findByClass, findByTag, clickOn} from '../spec_helper';


describe('ExpanderContent', () => {
  const renderIntoDom = props => ReactDOM.render(
    <ExpanderContent {...props}>
      <div>You won a brand new car!</div>
    </ExpanderContent>, root
  );

  describe('when expanded is unset', () => {
    it('hides the content', () => {
      const result = renderIntoDom({expanded: false});
      expect(findByClass(result, 'collapse')).not.toHaveClass('in');
    });
  });

  describe('when expanded is set to false', () => {
    it('hides the content', () => {
      const result = renderIntoDom({expanded: false});
      expect(findByClass(result, 'collapse')).not.toHaveClass('in');
    });
  });

  describe('when expanded is set to true', () => {
    it('shows the content', () => {
      const result = renderIntoDom({expanded: true});
      expect(findByClass(result, 'collapse')).toHaveClass('in');
    });
  });

  describe('#toggle', () => {
    let onExitedSpy, onEnteredSpy, expanderContent;

    describe('when the content was already visible', () => {
      beforeEach(() => {
        onExitedSpy = jasmine.createSpy('on exited');
        expanderContent = renderIntoDom({expanded: true, onExited: onExitedSpy, delay: 0});
        expanderContent.toggle();
      });

      it('hides the content', () => {
        expect(findByClass(expanderContent, 'collapse')).not.toHaveClass('in');
        expect(onExitedSpy).toHaveBeenCalled();
      });
    });

    describe('when the content is not visible', () => {
      beforeEach(() => {
        onEnteredSpy = jasmine.createSpy('onEntered');
        expanderContent = renderIntoDom({expanded: false, onEntered: onEnteredSpy, delay: 0});
        expanderContent.toggle();
      });

      it('shows the content', () => {
        expect(findByClass(expanderContent, 'collapse')).toHaveClass('in');
        expect(onEnteredSpy).toHaveBeenCalled();
      });
    });

    it('can be invoked ad nauseum', () => {
      expanderContent = renderIntoDom({expanded: false, delay: 0});
      expanderContent.toggle();
      expect(findByClass(expanderContent, 'collapse')).toHaveClass('in');
      expanderContent.toggle();
      expect(findByClass(expanderContent, 'collapse')).not.toHaveClass('in');
      expanderContent.toggle();
      expect(findByClass(expanderContent, 'collapse')).toHaveClass('in');
    });
  });
});

describe('ExpanderTrigger', () => {
  const renderComponent = props => ReactTestUtils.renderIntoDocument(
    <ExpanderTrigger>
      <button>Click here to trigger</button>
    </ExpanderTrigger>
  );

  let expanderTrigger;

  describe('on click', () => {
    describe('when target is set on state', () => {
      let expanderContent;
      beforeEach(() => {
        expanderContent = jasmine.createSpyObj('expanderContent', ['toggle']);
        expanderTrigger = renderComponent();
        expanderTrigger.setTarget(expanderContent);
      });

      it('invokes the #toggle method on the provided target', () => {
        clickOn(findByTag(expanderTrigger, 'button'));
        expect(expanderContent.toggle).toHaveBeenCalled();
      });
    });

    describe('when target is not set on state', () => {
      it('warns the user that no ExpanderContent was provided', () => {
        spyOn(console, 'warn');

        expanderTrigger = renderComponent();
        clickOn(findByTag(expanderTrigger, 'button'));

        expect(console.warn).toHaveBeenCalledWith('No ExpanderContent provided to ExpanderTrigger.');
      });
    });
  });
});
