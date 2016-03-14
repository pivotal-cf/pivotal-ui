module.exports = function mixin(ParentClass) {
  return {
    with(...classGenerators) {
      return classGenerators.reduceRight((ParentClass, classGenerator) => classGenerator(ParentClass), ParentClass);
    }
  };
};