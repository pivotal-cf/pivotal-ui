beforeEach(() => {
  jasmine.addMatchers({
    toHaveBeenRenderedWithProps(util, customEqualityTesters) {
      return {
        compare(actual, expected) {
          const result = {};

          const mostRecentCall = actual.prototype.render.calls.mostRecent();

          const displayClass = actual.displayName;
          const displayExpected = jasmine.pp(expected);


          if (mostRecentCall) {
            const actualProps = mostRecentCall.object.props;
            result.pass = util.equals(
              actualProps,
              jasmine.objectContaining(expected),
              customEqualityTesters
            );


            if (result.pass) {
              result.message = `Expected ${displayClass} not to have been rendered with props ${displayExpected}`;
            } else {
              const displayActual = jasmine.pp(actualProps);

              result.message = `Expected ${displayClass} to have been rendered with props ${displayExpected}, but got ${displayActual}`;
            }
          } else {
            result.pass = false;

            result.message = `Expected ${displayClass} to have been rendered with props ${displayExpected}, but it was never rendered`;
          }

          return result;
        }
      };
    }
  });
});

afterAll(() => {
  delete require.cache[require.resolve(__filename)];
});

module.exports = {
  spyOnRender(componentClass) {
    return spyOn(componentClass.prototype, 'render').and.returnValue(null);
  }
};