import flow from 'lodash.flow';

export default function Pluggable({plugins, children, type}) {
  return flow(...plugins.map(p => p[type]).filter(Boolean))(children);
}
