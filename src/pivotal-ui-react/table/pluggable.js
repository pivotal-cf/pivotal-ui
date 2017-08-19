// import flow from 'lodash.flow';
import React from 'react';

export default function Pluggable({plugins, children, type}) {
  const target = React.Children.only(children);
  return plugins.reduce((children, Component) => {
    return <Component {...{child: React.Children.only(children), target, type}}/>;
  }, target);
}

export function useLast({reversedPlugins, type}) {
  const plugin = reversedPlugins.find(plugin => plugin[type]);
  return plugin && plugin[type];
}