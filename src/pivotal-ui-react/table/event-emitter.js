export const emit = (subject, {event, opts = {}, initial}) =>
  subject.props.plugins.reduce((memo, plugin) =>
    plugin[event] ? plugin[event]({...opts, memo, subject}) : memo, initial);