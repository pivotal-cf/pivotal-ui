import React from 'react';
import {configure as configureEnzyme, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configureEnzyme({adapter: new Adapter()});
import {matcherResult} from './common';
import jestDiff from 'jest-diff';

const root = document.createElement('div');
document.body.appendChild(root);

let lastRendered;
const testRender = element => {
  lastRendered = mount(element, {attachTo: root});
  // eslint-disable-next-line no-console
  lastRendered.print = () => console.log(lastRendered.debug());
  return lastRendered;
};

const testReset = () => {
  lastRendered && lastRendered.unmount();
  lastRendered = undefined;
};

const getComponent = element => {
  if (typeof element === 'object') return element;
  if (!lastRendered) throw new Error('No last rendered component found. '
    + 'Did you forget to render with `testRender`?');
  return lastRendered.find(element);
};

expect.extend({
  toHaveBeenRendered(component) {
    const wrapper = getComponent(component);
    const pass = wrapper.exists();

    const message = pass
      ? () => this.utils.matcherHint('.not.toHaveBeenRendered') + '\n\n'
        + 'Expected component not to have been rendered, but it was.'
      : () => this.utils.matcherHint('.toHaveBeenRendered') + '\n\n'
        + 'Expected component to have been rendered, but it was not.';

    return {pass, message};
  },

  toHaveBeenRenderedWithProps(component, expectedProps) {
    const wrapper = getComponent(component);
    const actualProps = wrapper.length > 1 ? wrapper.map(w => w.props()) : [wrapper.props()];
    const pass = actualProps.some(actual => this.equals(expectedProps, actual));
    const diff = actualProps.map(actual => jestDiff(expectedProps, actual)).join('\n\n');

    return matcherResult.call(this, {
      matcher: 'toHaveBeenRenderedWithProps',
      pass,
      notMessage: 'Expected component not to have been rendered with given props:\n\n'
        + `${diff}`,
      message: 'Expected component to have been rendered with given props'
        + `${actualProps.length > 1 ? ' at least once': ''}:\n\n`
        + `${diff}`
    });
  }
});

export {testRender, testReset};