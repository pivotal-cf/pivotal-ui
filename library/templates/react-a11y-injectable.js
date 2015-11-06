var a11y = require('react-a11y');
a11y(global.React, {warningPrefix: "REACT-A11Y-ERR ", includeSrcNode: "asString"});
if (global.callPhantom) {
  setTimeout(global.callPhantom, 3000);
}
