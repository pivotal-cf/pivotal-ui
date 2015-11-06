module.exports = {
  toBeValid: function() {
    return {
      compare: function(element) {
        const Klass = element.type;

        const errorMessages = Object.keys(Klass.propTypes).reduce(function(memo, prop) {
          const error = Klass.propTypes[prop](element.props, prop);
          if (error) {
            memo.push(error.message);
          }
          return memo;
        }, []);

        var pass = !errorMessages.length;
        var message = pass ?
          `Expected element not to be a valid ${Klass.name}` :
          `Expected element to be a valid ${Klass.name}. Validation errors:\n  ${errorMessages.join('\n  ')}`;

        return {pass, message};
      }
    };
  }
};
