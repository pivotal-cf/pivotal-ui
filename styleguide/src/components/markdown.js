import React from 'react';
import {Link} from 'gatsby';
import {Icon} from '../../../src/react/iconography';
import {headingNodeToSlug} from '../helpers/markdown-utils';
import '../../stylesheets/markdown.scss';

const createHeading = (Tag, link) => mdNode => {
  const slug = headingNodeToSlug(mdNode);

  return (
    <Tag className={`em-high mbxl mtxxl sg-heading sg-${Tag}`} id={slug}>
      {mdNode.children}
      {link && (
        <a
          href={`#${slug}`}
          aria-label={`heading: ${slug}`}
          className="sg-heading__link type-gray mlm ptl">
          <Icon
            verticalAlign="baseline"
            src="link"
          />
        </a>
      )}
    </Tag>
  );
};

export const H1 = createHeading('h1', true);

export const H2 = createHeading('h2', true);

export const H3 = createHeading('h3', false);

export const H4 = createHeading('h4', false);

export const H5 = createHeading('h5', false);

export const H6 = createHeading('h6', false);

export const Anchor = ({href = '', ...props}) => {
  if (href && href.startsWith('/')) return <Link {...props} to={href}/>;
  return <a {...props} href={href}/>;
};

export const Img = props => {
  return (
    <img {...props} alt={props.alt || ''} className="sg-img"/>
  );
};

export const Table = ({children, ...props}) => {
  const thead = children.find(child => child.type === 'thead');
  const tbody = children.find(child => child.type === 'tbody');

  return (
    <table {...props} {...{className: 'pui-table sg-table'}}>
      <thead>
        {React.Children.map(thead.props.children, child => {
          return React.cloneElement(child, {className: 'tr-no-h-borders'});
        })}
      </thead>
      <tbody>
        {React.Children.map(tbody.props.children, child => {
          return React.cloneElement(child, {className: 'tr-no-h-borders'});
        })}
      </tbody>
    </table>
  );
};