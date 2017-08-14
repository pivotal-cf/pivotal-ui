export function emit(subject, {event, opts = {}, initial}) {
  return subject.props.plugins.reduce((memo, plugin) => plugin[event]
    ? plugin[event]({...opts, memo, subject})
    : memo,
    initial)
}