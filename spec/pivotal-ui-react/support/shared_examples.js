
export function itPropagatesAttributes(componentIdentifier, attributeHash) {
  describe('when className, id and style are given', () => {
    it('adds these attributes to the correct component', () => {
      expect(componentIdentifier).toHaveClass(attributeHash.className);
      expect(componentIdentifier).toHaveAttr('id', attributeHash.id);
      expect(componentIdentifier).toHaveCss(attributeHash.style);
    });
  });
}
