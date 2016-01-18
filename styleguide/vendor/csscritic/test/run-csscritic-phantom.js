// PhantomJS regression runner for csscritic
// This version references all dependencies and can be used to test against the latest changes.
"use strict";

phantom.injectJs("test/csscritic-cli.js");
phantom.injectJs("src/boot/cli.js");
