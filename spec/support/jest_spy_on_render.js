const REACT_LIFECYCLE_METHODS = [
  'componentWillMount',
  'componentDidMount',
  'componentWillReceiveProps',
  // 'shouldComponentUpdate',
  'componentWillUpdate',
  'componentDidUpdate',
  'componentWillUnmount',
  'componentDidCatch'
];

export const getPropsByRender = actual => {
  if (actual.prototype && actual.prototype.render) {
    return actual.prototype.render.mock.instances
      .map(({props}) => props);
  }

  return actual.mock.calls.map(([props]) => props);
};

export function resetRenders(Component) {
  if (Component.prototype.render) {
    Component.prototype.render.mockClear();
  } else {
    Component.mockClear();
  }
}

export function spyOnRender(componentClass) {
  REACT_LIFECYCLE_METHODS.forEach(methodName => {
    if (componentClass.prototype[methodName]) {
      jest.spyOn(componentClass.prototype, methodName).mockImplementation(() => null);
    }
  });

  return jest.spyOn(componentClass.prototype, 'render').mockReturnValue(null);
}

export function propsOnLastRender(componentClass) {
  const propsByRender = getPropsByRender(componentClass);
  return propsByRender[propsByRender.length - 1];
}

export function propsOnRenderMatching(Component, expectedProps) {
  const allProps = Component.prototype.render.mock.instances
    .map(({props}) => props)
    .reverse();

  return allProps.find(calledProps =>
    Object.entries(expectedProps).every(([key, value]) => calledProps[key] === value)
  );
}

function getDisplayName(componentClass) {
  return componentClass.displayName || componentClass.name;
}

export const matchers = {
  toHaveBeenRenderedWithProps(actual, expected) {
    let result = {};

    const propsByRender = getPropsByRender(actual);

    const matchingProps = propsByRender.find(props => {
      return this.equals(
        props,
        expected,
      );
    });

    const displayClass = getDisplayName(actual);
    const displayExpected = this.utils.printExpected(expected);

    if (matchingProps) {
      result.pass = true;
      result.message = () => `Expected ${displayClass} not to have been rendered with props ${displayExpected}`;
    } else {
      result.pass = false;
      const displayActual = this.utils.printReceived(propsByRender);

      result.message = () => `Expected ${displayClass} to have been rendered with props ${displayExpected}, but got ${displayActual}`;
    }

    return result;
  },
  toHaveBeenRendered(actual) {
    let result = {};

    const displayClass = getDisplayName(actual);
    const propsByRender = getPropsByRender(actual);

    if (propsByRender.length !== 0) {
      result.pass = true;
      result.message = () => `Expected ${displayClass} not to have been rendered`;
    } else {
      result.pass = false;
      result.message = () => `Expected ${displayClass} to have been rendered`;
    }

    return result;
  },
  toHaveBeenRenderedTimes(actual, expectedTimes) {
    const displayClass = getDisplayName(actual);

    const actualTimes = actual.prototype.render.mock.calls.length;
    if (actualTimes === expectedTimes) {
      return {
        pass: true,
        message: () => `Expected ${displayClass} NOT to have been rendered ${actualTimes} times.`
      };
    }

    return {
      pass: false,
      message: () =>
        `Expected ${displayClass} to have been rendered ${expectedTimes} times, ` +
        `but it was rendered ${actualTimes} times.`
    };
  }
};