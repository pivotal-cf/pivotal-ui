import React from 'react';
import Page from '../../src/components/page';
import {testRender} from '../support/matchers/jest_react';

describe('Page', () => {
  let match, routes;

  beforeEach(() => {
    match = {path: '/my-component'};
    routes = {
      '/my-component': {
        file: '/my-component.md'
      }
    };

    testRender(<Page {...{match, routes}}/>);
  });

  it('renders a page', () => {
    expect('.styleguide-page').toExist();
  });
});