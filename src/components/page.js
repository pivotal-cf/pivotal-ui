import React from 'react';
import PropTypes from 'prop-types';
import {Icon} from 'pivotal-ui/react/iconography';
import ImportPreview from './import_preview';
import {repository} from '../../package.json';

const styleguideRepo = repository || 'https://github.com/pivotal-cf/pui-styleguide';
const formatEditUrl = file => `${styleguideRepo}/edit/master/docs/${file}`;
const formatIssueUrl = title => `https://github.com/pivotal-cf/pivotal-ui/issues/new?title=${title}%3A%20<issue description>`;

export default class Page extends React.PureComponent {
  static propTypes = {
    category: PropTypes.string,
    file: PropTypes.string.isRequired,
    markdownContent: PropTypes.node.isRequired,
    pageMetadata: PropTypes.object,
    route: PropTypes.string
  };

  componentDidMount() {
    if (typeof document === 'undefined') return;
    const {pageMetadata: {title}} = this.props;
    const defaultTitle = 'Pivotal UI Styleguide';
    document.title = title ? `${title} | ${defaultTitle}` : defaultTitle;
  }

  render() {
    const {route, file, category, markdownContent, pageMetadata} = this.props;
    const {title, reactPath, reactComponents, cssPath} = pageMetadata;
    const isComponentPage = category === 'component' || category === 'modifier';

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
          {!isComponentPage ? markdownContent : (
            <nav className="tab-simple">
              <ul className="nav nav-tabs">
                <li className="">
                  <a href={route}>Description</a>
                </li>
                <li className="">
                  <a href={route + '/examples'}>Examples</a>
                </li>
                {reactPath && <li className="">
                  <a href={route + '/props'}>Props</a>
                </li>}
                <li className="">
                  <a href={route + '/guidelines'}>Guidelines</a>
                </li>
              </ul>
            </nav>
          )}
        </main>
      </div>
    );
  }
}