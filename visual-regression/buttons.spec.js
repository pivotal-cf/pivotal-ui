const assert = require('assert');

function assertDiff(results) {
  results.forEach((result) => assert.ok(result.isExactSameImage));
}

describe('Buttons', () => {
  beforeEach(() => {
    browser.url('/components/buttons')
  });

  it('renders the buttons docs', () => {
    const report = browser.checkDocument();
    assertDiff(report);
  });
});