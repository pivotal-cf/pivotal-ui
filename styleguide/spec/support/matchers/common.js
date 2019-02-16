export function matcherResult({matcher, pass, notMessage, message}) {
  return {
    pass,
    message: pass
      ? () => `${this.utils.matcherHint('.not.' + matcher)}\n\n${notMessage}`
      : () => `${this.utils.matcherHint('.' + matcher)}\n\n${message}`
  };
}