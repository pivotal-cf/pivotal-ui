gemini.suite('buttons', suite => {
  const buttons = ['btn-default', 'btn-primary', 'btn-brand', 'btn-danger']

  suite.setUrl('/buttons')

  for(let button of buttons) {
    gemini.suite(button, suite => {
      const selector = `code .${button}`;

      suite
        .setCaptureElements([selector])
        .before((actions, find) => this.button = find(selector))
        .capture('plain')
        .capture('hovered', (actions, find) => actions.mouseMove(this.button))
        .capture('pressed', (actions, find) => actions.mouseDown(this.button))
        .capture('clicked', (actions, find) => actions.mouseUp(this.button))
    })
  }
});