import React from 'react'
import MarkdownViewer from './code_area/MarkdownViewer'

import ButtonStuff from '../docs/Buttons.md'
import RibbonStuff from '../docs/Ribbons.md'
import PanelStuff from '../docs/Panels.md'

const content = {
  "/buttons": ButtonStuff,
  "/ribbons": RibbonStuff,
  "/panels": PanelStuff,
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