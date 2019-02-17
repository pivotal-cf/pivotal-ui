import React from 'react';
import Layout from '../src/components/layout';

export const wrapPageElement = ({element, props}) => {
  return <Layout {...props}>{element}</Layout>;
};

export const onRouteUpdate = () => {
  const main = document.querySelector('main.styleguide-main');

  if (main) {
    main.scrollTo(0, 0);
    main.focus();
  }
};