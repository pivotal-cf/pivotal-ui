
window.onload = function() {
  csscritic.addReporter(csscritic.BasicHTMLReporter());
  csscritic.add('components/alerts/index.html');
  csscritic.execute();
};