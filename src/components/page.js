import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {Icon} from 'pivotal-ui/react/iconography';
import ImportPreview from './import_preview';
import PropTable from './prop_table';
import Config from '../config';
import Anchor from './anchor';

const formatEditUrl = file => `${Config.get('repository')}/edit/master/docs/${file}`;
const formatIssueUrl = title => `${Config.get('puiRepository')}/issues/new?title=${title}%3A%20<issue description>`;

export default class Page extends PureComponent {
  static propTypes = {
    category: PropTypes.string,
    file: PropTypes.string.isRequired,
    pageComponents: PropTypes.object.isRequired,
    pageMetadata: PropTypes.object,
    pageSections: PropTypes.array.isRequired,
    route: PropTypes.string
  };

  render() {
    const {route, file, category, pageComponents, pageSections, pageMetadata} = this.props;
    const {title, reactPath, reactComponents, cssPath} = pageMetadata;
    const isComponentPage = category !== 'pages';

    const tabLinks = pageSections.map(({title, href}) => {
      return (
        <li key={href} className={classnames({active: href === route})}>
          <Anchor href={href}>{title}</Anchor>
        </li>
      );
    });

    let content;
    if (route.endsWith('/props')) {
      content = Object.keys(reactComponents).map(componentName => (
        <PropTable {...{
          key: componentName,
          componentName,
          component: pageComponents[componentName],
          pagePropDescriptions: reactComponents
        }}/>
      ));
    } else {
      const {SectionComponent} = pageSections.find(({href}) => href === route) || {};
      content = SectionComponent ? <SectionComponent/> : null;
    }

    return (
      <div className="styleguide-page bg-neutral-9">
        <header className="styleguide-page-header bg-neutral-11 pvxl phxxxl">
          <a className="type-underline-hover type-sm" href={formatEditUrl(file)} target="_blank">
            <Icon verticalAlign="baseline" src="mode_edit"/>
            <span className="toolbar--label mlm">Edit this page</span>
          </a>
          {isComponentPage && <a className="type-underline-hover type-sm mlxl" href={formatIssueUrl(title)} target="_blank">
            <Icon verticalAlign="baseline" src="github"/>
            <span className="toolbar--label mlm">Report an issue</span>
          </a>}
          <h1 className="mtxl em-high">{title}</h1>
        </header>
        <nav className="tab-simple phxl bg-neutral-11">
          <ul className="styleguide-tabs nav nav-tabs">
            {tabLinks}
          </ul>
        </nav>
        <main className="styleguide-page-main">
          {!isComponentPage ? null : (
            <div className="styleguide-tab-content pvxl phxxxl">
              {content}
            </div>
          )}
        </main>
      </div>
    );
  }
}