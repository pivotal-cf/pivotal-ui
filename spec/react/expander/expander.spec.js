import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {ExpanderContent, ExpanderTrigger} from '../../../src/react/expander';

describe('ExpanderContent', () => {
  const renderIntoDom = props => ReactDOM.render(
    <ExpanderContent {...props}>
      <div>You won a brand new car!</div>
    </ExpanderContent>, root
  );

  describe('when expanded is unset', () => {
    it('hides the content', () => {
      renderIntoDom({expanded: false});
      expect('.pui-collapsible').not.toHaveClass('in');
    });
  });

  describe('when expanded is set to false', () => {
    it('hides the content', () => {
      renderIntoDom({expanded: false});
      expect('.pui-collapsible').not.toHaveClass('in');
    });
  });

  describe('when expanded is set to true', () => {
    it('shows the content', () => {
      renderIntoDom({expanded: true});
      expect('.pui-collapsible').toHaveClass('in');
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
        expect('.pui-collapsible').not.toHaveClass('in');
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
        expect('.pui-collapsible').toHaveClass('in');
        expect(onEnteredSpy).toHaveBeenCalled();
      });
    });

    it('can be invoked ad nauseum', () => {
      expanderContent = renderIntoDom({expanded: false, delay: 0});
      expanderContent.toggle();
      expect('.pui-collapsible').toHaveClass('in');
      expanderContent.toggle();
      expect('.pui-collapsible').not.toHaveClass('in');
      expanderContent.toggle();
      expect('.pui-collapsible').toHaveClass('in');
    });
  });
});

describe('ExpanderTrigger', () => {
  const renderComponent = props => ReactDOM.render(
    <ExpanderTrigger>
      <button>Click here to trigger</button>
    </ExpanderTrigger>,
    root
  );

  let expanderTrigger;

  describe('on click', () => {
    describe('when target is set on state', () => {
      let expanderContent;

      beforeEach(() => {
        expanderContent = {toggle: jest.fn()};
        expanderTrigger = renderComponent();
        expanderTrigger.setTarget(expanderContent);
      });

      it('invokes the #toggle method on the provided target', () => {
        $('button').simulate('click');
        expect(expanderContent.toggle).toHaveBeenCalled();
      });
    });

    describe('when target is not set on state', () => {
      it('warns the user that no ExpanderContent was provided', () => {
        spyOn(console, 'warn');

        expanderTrigger = renderComponent();
        $('button').simulate('click');

        expect(console.warn).toHaveBeenCalledWith('No ExpanderContent provided to ExpanderTrigger.');
      });
    });
  });
});
