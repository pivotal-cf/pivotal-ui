import React from 'react';
import PropTypes from 'prop-types';

const ThemeContext = React.createContext('light');

const ThemeProvider = ({theme = 'light', ...props}) => {
  return (
    <ThemeContext.Provider {...props} value={theme}/>
  );
};

ThemeProvider.propTypes = {
  theme: PropTypes.oneOf(['light', 'dark'])
};

const ThemeConsumer = ThemeContext.Consumer;

export {ThemeProvider, ThemeConsumer};