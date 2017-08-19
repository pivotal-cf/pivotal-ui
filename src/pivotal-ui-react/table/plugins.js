import React from 'react';

export default function Plugins({reversedPlugins, children, type}) {
  const target = React.Children.only(children);
  return reversedPlugins
    .filter(Plugin => Plugin.prototype && Plugin.prototype[type])
    .reduce((children, Plugin) => <Plugin {...{child: React.Children.only(children), target, type}}/>, target);
}

export function useLast({reversedPlugins, type}) {
  const plugin = reversedPlugins.find(plugin => plugin[type]);
  return plugin && plugin[type];
}