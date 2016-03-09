function getComponentPath(path) {
  const navPathRegEx = /\/([^_]*)_.*.html/;

  const match = navPathRegEx.exec(path);

  const language = match ? match[1] : 'react';

  return { language };
}

module.exports = getComponentPath;
