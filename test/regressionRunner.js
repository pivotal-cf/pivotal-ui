
window.onload = function() {
  csscritic.addReporter(csscritic.BasicHTMLReporter());
  csscritic.add('components/alerts/index.html');
  csscritic.add('components/small_gravatar/index.html');
  csscritic.add('components/large_gravatar/index.html');
  csscritic.execute();
};