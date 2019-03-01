import React from 'react';
import ReactDOM from 'react-dom';
import {ThemeProvider, ThemeConsumer} from '../../../src/react/context';

describe('theme context', () => {
  it('has light theme by default (without provider)', () => {
    ReactDOM.render(
      <ThemeConsumer>
        {theme => <div className={`theme-${theme}`}/>}
      </ThemeConsumer>,
      root
    );

    expect('div.theme-light').toExist();
  });

  it('provider passes light theme by default', () => {
    ReactDOM.render(
      <ThemeProvider>
        <ThemeConsumer>
          {theme => <div className={`theme-${theme}`}/>}
        </ThemeConsumer>
      </ThemeProvider>,
      root
    );

    expect('div.theme-light').toExist();
  });

  it('provider can pass light theme', () => {
    ReactDOM.render(
      <ThemeProvider theme="light">
        <ThemeConsumer>
          {theme => <div className={`theme-${theme}`}/>}
        </ThemeConsumer>
      </ThemeProvider>,
      root
    );

    expect('div.theme-light').toExist();
  });

  it('provider can pass dark theme', () => {
    ReactDOM.render(
      <ThemeProvider theme="dark">
        <ThemeConsumer>
          {theme => <div className={`theme-${theme}`}/>}
        </ThemeConsumer>
      </ThemeProvider>,
      root
    );

    expect('div.theme-dark').toExist();
  });
});