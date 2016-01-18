"use strict";

phantom.injectJs("node_modules/imagediff/imagediff.js");
phantom.injectJs("node_modules/jssha/src/sha.js");
phantom.injectJs("node_modules/ayepromise/ayepromise.js");
phantom.injectJs("build/dependencies/inlineresources.js");
phantom.injectJs("src/boot/scope.js");
phantom.injectJs("src/cli/phantomjsBind.js");
phantom.injectJs("src/cli/phantomjsRenderer.js");
phantom.injectJs("src/cli/signOffReporterUtil.js");
phantom.injectJs("src/cli/signOffReporter.js");
phantom.injectJs("src/cli/terminalReporter.js");
phantom.injectJs("src/cli/htmlFileReporter.js");
phantom.injectJs("src/cli/fileStorage.js");
phantom.injectJs("src/cli/phantomjs_runner.js");
phantom.injectJs("src/util.js");
phantom.injectJs("src/reporting.js");
phantom.injectJs("src/regression.js");
phantom.injectJs("src/main.js");
