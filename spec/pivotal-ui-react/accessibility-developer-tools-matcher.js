const axs = require('../../node_modules/accessibility-developer-tools/dist/js/axs_testing.js');

function failureMessageForAdtResult(result) {
  const elements = result.elements.map((element) => element.outerHTML);
  return [
    result.rule.heading,
    ...elements
  ].join('\n    ');
}

export default function toPassADT() {
  return {
    compare(node) {
      let result = {};

      let config = new axs.AuditConfiguration();
      config.showUnsupportedRulesWarning = false;
      config.scope = node;

      const adtResults = axs.Audit.run(config)
        .filter((adtResult) => adtResult.result === 'FAIL');

      result.pass = adtResults.length === 0;

      if (result.pass) {
        result.message = 'Expected ADT to fail';
      } else {
        const failures = adtResults
          .map((result) => failureMessageForAdtResult(result))
          .join('\n  ');
        result.message = `Expected ADT to pass but got errors:\n  ${failures}`;
      }

      return result;
    }
  };
}