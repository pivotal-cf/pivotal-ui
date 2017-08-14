export default function ({event, opts = {}, initial}) {
  return this.props.plugins.reduce((memo, plugin) => plugin[event]
    ? plugin[event]({...opts, memo, subject: this})
    : memo,
    initial)
}