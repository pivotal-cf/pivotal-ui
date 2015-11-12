function assignToGlobal(modules) {
  modules.forEach((module) => {
    _.each(module, function(value, key) {
      global[key] = value;
    });
  });
}

assignToGlobal([
  require('pui-react-alerts'),
  require('pui-react-autocomplete')
]);
