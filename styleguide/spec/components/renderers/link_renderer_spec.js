import LinkRenderer from '../../../src/components/renderers/link_renderer';
import {Link} from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {testRender} from '../../support/matchers/jest_react';

describe('LinkRenderer', () => {
  let href, children;

  beforeEach(() => {
    spyOnRender(Link);
  });

  describe('when the href is external', () => {
    beforeEach(() => {
      href = 'http://www.some_website.com';
      children = ['external link'];
      testRender(<LinkRenderer {...{href, children}}/>);
    });

    it('renders an <a> tag', () => {
      expect('a').toHaveAttr('href', 'http://www.some_website.com');
      expect('a').toHaveText('external link');
    });
  });

  describe('when the href starts with /static/', () => {
    beforeEach(() => {
      href = '/static/versions/v205';
      children = ['Version 205'];
      testRender(<LinkRenderer {...{href, children}}/>);
    });

    it('renders an <a> tag', () => {
      expect('a').toHaveAttr('href', '/static/versions/v205');
      expect('a').toHaveText('Version 205');
    });
  });

  describe('when the href is internal to the styleguide', () => {
    beforeEach(() => {
      href = '/some/page/on/this/domain';
      children = ['name of page'];
      testRender(<Router><LinkRenderer {...{href, children}}/></Router>);
    });

    it('renders a react router Link', () => {
      expect(Link).toHaveBeenRenderedWithProps({to: href, replace: false, children: 'name of page'});
    });
  });
});