import React from 'react'
import MarkdownViewer from './MarkdownViewer'

import ButtonStuff from '../docs/Button.md'
import RibbonStuff from '../docs/Ribbon.md'

const content = {
  "/button": ButtonStuff,
  "/ribbon": RibbonStuff,
}

const homepage = <div className="content">
  Make a selection on the left
</div>

export default () => {
  if(window.location.pathname === "/" || !content[window.location.pathname]) {
    return homepage
  }

  return <div className="content">
    <MarkdownViewer html={content[window.location.pathname]}/>
  </div>
}