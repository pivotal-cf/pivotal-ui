import React from 'react';
import ReactDOM from 'react-dom';
import Page from '../../src/components/page';
import MarkdownFileHelper from '../../src/helpers/markdown_file_helper';

describe('Page', () => {
  let match, routes;

  beforeEach(() => {
    match = {
      path: '/my-component'
    };

    routes = {
      '/my-component': {
        file: '/my-component.md',
        metadata: {
        }
      }
    };

    jest.spyOn(MarkdownFileHelper, 'getParentTitle').mockImplementation(() => 'Test Title');

    ReactDOM.render(<Page match={match} routes={routes}/>, root);
  });

  it('renders a page', () => {
    expect('.styleguide-page').toExist();
  });

  it('places the correct title', () => {
    expect('.styleguide-page h1.em-high').toHaveText('Test Title');
  });

  it('no deprecation alert if not deprecated', () => {
    expect('.alert.pui-alert.alert-warning.pui-alert-warning').not.toExist();
  });

  describe('Component is deprecated and no deprecation message is given', () => {
    beforeEach(() => {
      routes['/my-component'].metadata.deprecationMessage = true;

      ReactDOM.unmountComponentAtNode(root);
      ReactDOM.render(<Page match={match} routes={routes}/>, root);
    });

    it('renders a warning alert', () => {
      expect('.pui-alert.pui-alert-warning').toExist();
    });

    it('renders the default deprecation message', () => {
      expect('.pui-alert.pui-alert-warning').toContainText('This component has been deprecated and will be removed in the next major version of Pivotal UI. Reach out to the Pivotal UI team if you have any questions.');
    });
  });

  describe('Component is deprecated and deprecation message is given', () => {
    beforeEach(() => {
      routes['/my-component'].metadata.deprecationMessage = 'custom deprecation message';

      ReactDOM.unmountComponentAtNode(root);
      ReactDOM.render(<Page match={match} routes={routes}/>, root);
    });

    it('renders a warning alert', () => {
      expect('.pui-alert.pui-alert-warning').toExist();
    });

    it('renders the custom deprecation message', () => {
      expect('.pui-alert.pui-alert-warning').toContainText('custom deprecation message');
    });
  });
});