import React from 'react';
import SidebarWrapper from './sidebar-wrapper';
import '../../stylesheets/main.scss';

const Main = ({children}) => (
  <div className="sg-content">
    <div className="sg-full-sidebar">
      <SidebarWrapper/>
    </div>
    <main className="sg-main" id="main" tabIndex="-1">
      <div id="main-content-target"/>
      <div className="sg-main__content">
        {children}
      </div>
    </main>
  </div>
);

export default Main;
