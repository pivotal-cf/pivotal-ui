import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {Icon} from 'pivotal-ui/react/iconography';
import ImportPreview from './import_preview';
import Config from '../config';
import Anchor from './anchor';

const formatEditUrl = file => `${Config.get('repository')}/edit/master/docs/${file}`;
const formatIssueUrl = title => `${Config.get('puiRepository')}/issues/new?title=${title}%3A%20<issue description>`;

export default class Page extends React.PureComponent {
  static propTypes = {
    category: PropTypes.string,
    file: PropTypes.string.isRequired,
    pageMetadata: PropTypes.object,
    pageSections: PropTypes.array.isRequired,
    route: PropTypes.string
  };

  componentDidMount() {
    if (typeof document === 'undefined') return;
    const {pageMetadata: {title}} = this.props;
    const defaultTitle = 'Pivotal UI Styleguide';
    document.title = title ? `${title} | ${defaultTitle}` : defaultTitle;
  }

  render() {
    const {route, file, category, pageSections, pageMetadata} = this.props;
    const {title, reactPath, reactComponents, cssPath} = pageMetadata;
    const isComponentPage = category !== 'pages';

    const tabLinks = pageSections.map(({title, href}) => {
      return (
        <li key={href} className={classnames({active: href === route})}>
          <Anchor href={href}>{title}</Anchor>
        </li>
      );
    });

    console.log({pageSections})
    const {SectionComponent} = pageSections.find(({href}) => href === route) || {};
    const content = SectionComponent ? <SectionComponent/> : null;

    console.log({content})
    return (
      <div className="styleguide-page">
        <header className="styleguide-page-header pvxl phxxxl">
          <a className="type-underline-hover" href={formatEditUrl(file)} target="_blank">
            <Icon verticalAlign="baseline" src="mode_edit"/>
            <span className="toolbar--label mlm">Edit this page</span>
          </a>
          {isComponentPage && <a className="type-underline-hover mlxl" href={formatIssueUrl(title)} target="_blank">
            <Icon verticalAlign="baseline" src="github"/>
            <span className="toolbar--label mlm">Report an issue</span>
          </a>}
          <h1 className="mtxl em-high">{title}</h1>
        </header>
        <main className="phxl">
          {!isComponentPage ? null : (
            <Fragment>
              <nav className="tab-simple">
                <ul className="nav nav-tabs">
                  {tabLinks}
                </ul>
              </nav>
              {content}
            </Fragment>
          )}
        </main>
      </div>
    );
  }
}