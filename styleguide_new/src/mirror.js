import React from 'react'
import CodeMirror from 'codemirror'

export default () => {
  const myCodeMirror = CodeMirror(document.body, {
    value: "function myScript(){return 100;}\n",
    mode:  "javascript"
  });

  return <div>
    hello from mirror
  </div>
}