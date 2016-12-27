export default ParentClass => {
  return {
    with(...classGenerators) {
      return classGenerators.reduceRight((ParentClass, classGenerator) => classGenerator(ParentClass), ParentClass);
    }
  };
};
