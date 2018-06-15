import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {Icon} from 'pivotal-ui/react/iconography';
import ImportPreview from './import_preview';
import PropTable from './prop_table';
import Config from '../config';
import Anchor from './anchor';
import Prism from 'prismjs';
import 'prismjs/themes/prism-coy.css';
import 'prismjs/components/prism-bash.min.js';
import 'prismjs/components/prism-jsx.min.js';

const formatEditUrl = file => `${Config.get('repository')}/edit/master/docs/${file}`;
const issueUrl = `${Config.get('puiRepository')}/issues/new`;

export default class Page extends PureComponent {
  static propTypes = {
    file: PropTypes.string.isRequired,
    pageComponents: PropTypes.object.isRequired,
    pageMetadata: PropTypes.object,
    pageSections: PropTypes.array.isRequired,
    currentRoute: PropTypes.string
  };

  componentDidUpdate() {
    Prism.highlightAll();
  }

  render() {
    const {currentRoute, file, pageComponents, pageSections, pageMetadata} = this.props;
    const {title, reactPath, reactComponents, cssPath} = pageMetadata;
    const singlePageSection = pageSections.length === 1;

    const tabLinks = pageSections.map(({title, route}) => {
      return (
        <li key={route} className={classnames({active: route === currentRoute})}>
          <Anchor href={route}>{title}</Anchor>
        </li>
      );
    });

    let content;
    if (singlePageSection) {
      const {SectionComponent} = pageSections[0];
      content = SectionComponent ? <SectionComponent/> : null;
    } else if (currentRoute.endsWith('/props')) {
      content = Object.keys(reactComponents).map(componentName => (
        <PropTable {...{
          key: componentName,
          componentName,
          component: pageComponents[componentName],
          pagePropDescriptions: reactComponents
        }}/>
      ));
    } else {
      const {SectionComponent, title: sectionTitle} = pageSections.find(({route}) => route === currentRoute) || {};
      content = (
        <Fragment>
          {SectionComponent ? <SectionComponent/> : null}
          {sectionTitle === 'Overview' && <ImportPreview {...{reactPath, cssPath, reactComponents}}/>}
        </Fragment>
      );
    }

    return (
      <div className="styleguide-page">
        <header className={classnames('styleguide-page-header bg-neutral-10 pvxl phxxxl', {'border-bottom': singlePageSection})}>
          <a className="type-underline-hover type-sm" href={formatEditUrl(file)} target="_blank">
            <Icon verticalAlign="baseline" src="mode_edit"/>
            <span className="toolbar--label mlm">Edit this page</span>
          </a>
          <a className="type-underline-hover type-sm mlxl" href={issueUrl} target="_blank">
            <Icon verticalAlign="baseline" src="github"/>
            <span className="toolbar--label mlm">Report an issue</span>
          </a>
          <h1 className="mtxxl em-high">{title}</h1>
        </header>
        {singlePageSection ? null : <nav className="tab-simple phxl bg-neutral-10 border-bottom">
          <ul className="styleguide-tabs nav nav-tabs">
            {tabLinks}
          </ul>
        </nav>}
        <main className="styleguide-page-main">
          <div className="styleguide-tab-content paxxxl">
            {content}
          </div>
        </main>
      </div>
    );
  }
}