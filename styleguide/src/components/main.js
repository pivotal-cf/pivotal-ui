import React from 'react';
import SidebarWrapper from './sidebar_wrapper';
import '../../stylesheets/main.scss';

const Main = ({children}) => (
  <div className="sg-content">
    <SidebarWrapper/>
    <main className="sg-main" tabIndex="-1">
      <div className="sg-main--content">
        {children}
      </div>
    </main>
  </div>
);

export default Main;
