gemini.suite('buttons', suite => {
  const buttons = ['btn-default', 'btn-primary', 'btn-brand', 'btn-danger']

  suite.setUrl('/buttons')

  for(let button of buttons) {
    gemini.suite(button, suite => {
      const selector = `div .${button}`;

      suite
        .setCaptureElements([selector])
        .before((actions, find) => this.button = find(selector))
        .capture('plain')
    })
  }
});