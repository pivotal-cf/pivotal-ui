import React from 'react'
import ReactDOM from 'react-dom'
import {DefaultButton} from 'pui-react-buttons'

window.DefaultButton = DefaultButton

import * as Babel from 'babel-standalone'

const handleClick = () => {
  console.log(Babel)

  const input = `
<DefaultButton>yo</DefaultButton>
`;

  const output = Babel.transform(input, { presets: ['es2015', 'react'] }).code;
  console.log(output)

  ReactDOM.render(eval(output), document.getElementById('outputArea'))
}

const app = <div>
  <button onClick={handleClick}> click me</button>
  <div id="outputArea" style={{backgroundColor: 'red'}}>output area</div>
</div>

ReactDOM.render(app, document.getElementById('root'))