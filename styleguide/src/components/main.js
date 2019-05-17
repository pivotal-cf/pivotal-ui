import React from 'react';
import SidebarWrapper from './sidebar-wrapper';
import '../../stylesheets/main.scss';

const year = new Date().getFullYear();

const Main = ({ children }) => (
  <div className="sg-content">
    <div className="sg-full-sidebar">
      <SidebarWrapper />
    </div>
    <div className="sg-main-wrapper">
      <main className="sg-main" id="main" tabIndex="-1">
        <div id="main-content-target" />
        <div className="sg-main__content">
          {children}
        </div>
      </main>
      <footer className="sg-footer mtxxxl pvxl border-top">
        © {year} <a href="https://pivotal.io" target="_blank" rel="noreferrer">Pivotal Software</a>, Inc. All Rights Reserved.
        <span className="pln">
          <span className="mll">
            <a href="https://pivotal.io/privacy-policy" target="_blank" rel="noreferrer">Privacy Policy</a>
          </span>
          <span className="mll">
            <a href="https://pivotal.io/terms-of-use" target="_blank" rel="noreferrer">Terms of Use</a>
          </span>
          <span className="mll" id="teconsent" />
        </span>
      </footer>
    </div>
  </div>

);

export default Main;
