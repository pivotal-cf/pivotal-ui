import flow from 'lodash.flow';
import React from 'react';

export default function Pluggable({plugins, children, type}) {
  return flow(...plugins.map(p => p[type]).filter(Boolean))(React.Children.only(children));
}

export function useLast({reversedPlugins, type}) {
  return reversedPlugins.find(plugin => plugin[type])[type];
}