import React from 'react';
import SidebarWrapper from './sidebar_wrapper';
import '../../stylesheets/main.scss';

const Main = ({children}) => (
  <div className="styleguide-content-wrapper">
    <SidebarWrapper/>
    <main className="styleguide-main" tabIndex="-1">
      <div className="styleguide-main-content">
        {children}
      </div>
    </main>
  </div>
);

export default Main;
