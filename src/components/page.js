import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import classnames from 'classnames';
import {Icon} from 'pivotal-ui/react/iconography';
import MarkdownFileHelper from '../helpers/markdown_file_helper';
import ImportPreview from './import_preview';
import Config from '../config';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-bash.min.js';
import 'prismjs/components/prism-jsx.min.js';
import 'prismjs/components/prism-ruby.min.js';
import {Grid, FlexCol} from 'pivotal-ui/react/flex-grids';
import {Divider} from 'pivotal-ui/react/dividers';

const formatEditUrl = file => `${Config.get('repository')}/edit/master/docs/${file}`;
const issueUrl = `${Config.get('puiRepository')}/issues/new`;

export default class Page extends PureComponent {
  componentDidMount() {
    Prism.highlightAll();
    const {match, routes} = this.props;
    const {path} = match;
    const {file, pageTitle} = routes[path];
    const title = MarkdownFileHelper.getParentTitle(file);
    document.title = `${title} - ${pageTitle}`;
  }

  render() {
    const {match, routes} = this.props;
    const {path} = match;
    const {pageContent, file, tabHeaderIndex, metadata} = routes[path];
    const componentMatch = path.match(/(components|modifiers)\/(\w+)\/*/);

    const title = MarkdownFileHelper.getParentTitle(file);

    const tabLinks = MarkdownFileHelper.getTabRoutes(routes, path).map(route => (
      <li key={route} className={classnames({active: route === path})}>
        <Link to={route}>{routes[route].pageTitle}</Link>
      </li>
    ));

    return (
      <div className="styleguide-page">
        <header
          className={classnames('styleguide-page-header bg-neutral-10 pvxl phxxxl', {'border-bottom': tabLinks.length <= 1})}>
          <Grid className="mtl">
            <FlexCol>
              <h1 className="em-high">{title}</h1>
            </FlexCol>
            <FlexCol fixed>
              <a className="type-underline-hover type-sm" href={formatEditUrl(file)} target="_blank">
                <Icon verticalAlign="baseline" src="mode_edit"/>
                <span className="toolbar--label mlm">Edit this page</span>
              </a>
              <a className="type-underline-hover type-sm mlxl" href={issueUrl} target="_blank">
                <Icon verticalAlign="baseline" src="github"/>
                <span className="toolbar--label mlm">Report an issue</span>
              </a>
            </FlexCol>
          </Grid>
        </header>
        {tabLinks.length > 1 && <nav className="tab-simple phxl bg-neutral-10 border-bottom">
          <ul className="styleguide-tabs nav nav-tabs">
            {tabLinks}
          </ul>
        </nav>}
        <main className="styleguide-page-main">
          <div className="styleguide-tab-content paxxxl">
            {pageContent}
            {componentMatch && tabHeaderIndex <= 1 && (
              <div>
                <Divider className="mbxxl"/>
                <ImportPreview {...metadata}/>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }
}