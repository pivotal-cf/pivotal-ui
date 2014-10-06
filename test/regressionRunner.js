
window.onload = function() {
  csscritic.addReporter(csscritic.BasicHTMLReporter());
  csscritic.add('components/alert.html');
  csscritic.add('components/button.html');
  csscritic.add('components/button_sizes.html');
  csscritic.execute();
};