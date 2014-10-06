
window.onload = function() {
  csscritic.addReporter(csscritic.BasicHTMLReporter());
  csscritic.add('components/alert.html');
  csscritic.execute();
};