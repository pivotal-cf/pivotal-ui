import {matcherResult} from './common';

const jQueryObject = obj => obj && obj.constructor.prototype.jquery;

const maybeStringify = obj => typeof obj !== 'boolean' && obj !== null && obj !== undefined
&& typeof obj.toString === 'function' ? obj.toString() : obj;

const match = (expected, actual) => (expected && typeof expected.test === 'function')
  ? expected.test(actual)
  : maybeStringify(expected) === actual;

const findDomNode = (selector = '') => {
  let result;
  if (jQueryObject(selector)) result = selector;
  else if (typeof selector !== 'string') result = [selector];
  else if (global.jQuery) result = global.jQuery(selector);
  else if (global.$) result = global.$(selector);
  else result = global.document.querySelectorAll(selector);
  return {selector, result};
};

const withSingleNode = ({selector, result}, callback) => {
  console.log({selector, result})
  if (result.length === 0) return {
    pass: false,
    message: () => `No rendered elements found matching '${selector}'.`
  };

  if (result.length > 1) return {
    pass: false,
    message: () => `Cannot assert on multiple elements. ${result.length} elements found matching '${selector}'.`
  };

  return callback(result[0]);
};

expect.extend({
  toExist(selector) {
    const {result} = findDomNode(selector);
    const pass = result.length > 0;

    const message = pass
      ? () => this.utils.matcherHint('.not.toExist') + '\n\n'
        + `Expected element matching selector '${selector}' not to exist, but found ${result.length} match(es).`
      : () => this.utils.matcherHint('.toExist') + '\n\n'
        + `Expected element matching selector '${selector}' to exist, but found 0 matches.`;

    return {pass, message};
  },

  toHaveLength(selector, expectedLength) {
    let result = selector;

    if (typeof selector === 'string') {
      ({result} = findDomNode(selector));
    }

    if ('innerHTML' in result) {
      result = Array(result);
    }

    return matcherResult.call(this, {
      matcher: 'toHaveLength',
      pass: result.length === expectedLength,
      notMessage: `Expected list of elements matching '${selector}' not to have length:\n` +
      `  ${this.utils.printExpected(expectedLength)}\n` +
      'Received:\n' +
      `  ${this.utils.printReceived(result.length)}`,
      message: `Expected list of elements matching '${selector}' to have length:\n` +
      `  ${this.utils.printExpected(expectedLength)}\n` +
      'Received:\n' +
      `  ${this.utils.printReceived(result.length)}`
    });
  },

  toHaveText(selector, expectedText) {
    return withSingleNode(findDomNode(selector), node => {
      const actualText = node.textContent;
      const trimmedText = actualText && actualText.trim();
      let pass = false;
      if (expectedText && typeof expectedText.test === 'function') {
        pass = expectedText.test(actualText) || expectedText.test(trimmedText);
      } else {
        pass = maybeStringify(expectedText) === actualText || maybeStringify(expectedText) === trimmedText;
      }

      return matcherResult.call(this, {
        matcher: 'toHaveText',
        pass,
        notMessage: 'Expected element not to have text:\n' +
        `  ${this.utils.printExpected(expectedText)}\n` +
        'Received:\n' +
        `  ${this.utils.printReceived(actualText)}`,
        message: 'Expected element to have text:\n' +
        `  ${this.utils.printExpected(expectedText)}\n` +
        'Received:\n' +
        `  ${this.utils.printReceived(actualText)}`
      });
    });
  },

  toContainText(selector, expectedText) {
    return withSingleNode(findDomNode(selector), node => {
      const actualText = node.textContent || '';
      const pass = actualText.indexOf(expectedText) > -1;

      const message = pass
        ? () => this.utils.matcherHint('.not.toContainText') + '\n\n' +
          'Expected element not to contain text:\n' +
          `  ${this.utils.printExpected(expectedText)}\n` +
          'Received:\n' +
          `  ${this.utils.printReceived(actualText)}`
        : () => this.utils.matcherHint('.toContainText') + '\n\n' +
          'Expected element to contain text:\n' +
          `  ${this.utils.printExpected(expectedText)}\n` +
          'Received:\n' +
          `  ${this.utils.printReceived(actualText)}`;

      return {pass, message};
    });
  },

  toHaveClass(selector, expectedClass) {
    return withSingleNode(findDomNode(selector), node => {
      const pass = Array.isArray(expectedClass)
        ? expectedClass.every(cls => node.classList.contains(cls))
        : node.classList.contains(expectedClass);

      const message = pass
        ? () => this.utils.matcherHint('.not.toHaveClass') + '\n\n' +
          'Expected element not to have class:\n' +
          `  ${this.utils.printExpected(expectedClass)}\n` +
          'Received:\n' +
          `  ${this.utils.printReceived([...node.classList])}`
        : () => this.utils.matcherHint('.toHaveClass') + '\n\n' +
          'Expected element to have class:\n' +
          `  ${this.utils.printExpected(expectedClass)}\n` +
          'Received:\n' +
          `  ${this.utils.printReceived([...node.classList])}`;

      return {pass, message};
    });
  },

  toHaveValue(selector, expectedValue) {
    return withSingleNode(findDomNode(selector), node => {
      const actualValue = node.value;
      const pass = actualValue === expectedValue;

      const message = pass
        ? () => this.utils.matcherHint('.not.toHaveValue') + '\n\n' +
          'Expected element not to have value (using ===):\n' +
          `  ${this.utils.printExpected(expectedValue)}\n` +
          'Received:\n' +
          `  ${this.utils.printReceived(actualValue)}`
        : () => this.utils.matcherHint('.toHaveValue') + '\n\n' +
          'Expected element to have value (using ===):\n' +
          `  ${this.utils.printExpected(expectedValue)}\n` +
          'Received:\n' +
          `  ${this.utils.printReceived(actualValue)}`;

      return {pass, message};
    });
  },

  toHaveAttr(selector, attrName, expectedValue) {
    return withSingleNode(findDomNode(selector), node => {
      const actualValue = node.prop(attrName);
      const pass = match(expectedValue, actualValue);

      const message = pass
        ? () => this.utils.matcherHint('.not.toHaveAttr') + '\n\n' +
          `Expected element not to have attribute '${attrName}' with value:\n` +
          `  ${this.utils.printExpected(expectedValue)}\n` +
          'Received:\n' +
          `  ${this.utils.printReceived(actualValue)}`
        : () => this.utils.matcherHint('.toHaveAttr') + '\n\n' +
          `Expected element to have attribute '${attrName}' with value:\n` +
          `  ${this.utils.printExpected(expectedValue)}\n` +
          'Received:\n' +
          `  ${this.utils.printReceived(actualValue)}`;

      return {pass, message};
    });
  },

  toBeChecked(selector) {
    return withSingleNode(findDomNode(selector), node => {
      const actualValue = node.checked;
      const pass = !!actualValue;

      const message = pass
        ? () => this.utils.matcherHint('.not.toHaveAttr') + '\n\n' +
          `Expected element not to be checked but it was with value ${this.utils.printReceived(actualValue)}`
        : () => this.utils.matcherHint('.toHaveAttr') + '\n\n' +
          'Expected element to be checked, but it was not';

      return {pass, message};
    });
  },

  toHaveProp(selector, propName, expectedValue) {
    return withSingleNode(findDomNode(selector), node => {
      const actualValue = node[propName];

      return matcherResult.call(this, {
        matcher: 'toHaveProp',
        pass: match(expectedValue, actualValue),
        notMessage: `Expected element not to have property '${propName}' with value:\n` +
        `  ${this.utils.printExpected(expectedValue)}\n` +
        'Received:\n' +
        `  ${this.utils.printReceived(actualValue)}`,
        message: `Expected element to have property '${propName}' with value:\n` +
        `  ${this.utils.printExpected(expectedValue)}\n` +
        'Received:\n' +
        `  ${this.utils.printReceived(actualValue)}`
      });
    });
  },

  toBeDisabled(selector) {
    return withSingleNode(findDomNode(selector), node => {
      const pass = !!node.disabled;

      const message = pass
        ? () => this.utils.matcherHint('.not.toBeDisabled') + '\n\n' +
          'Expected element not to be disabled, but it was.'
        : () => this.utils.matcherHint('.toBeDisabled') + '\n\n' +
          'Expected element to be disabled, but it was not';

      return {pass, message};
    });
  }
});