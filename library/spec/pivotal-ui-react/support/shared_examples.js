

export function itPropagatesAttributes(componentIdentifier, attributeHash) {
  describe('when className, id and style are given', () => {
    it('adds these attributes to the correct component', () => {
      expect(componentIdentifier).toHaveClass(attributeHash.className);
      expect(componentIdentifier).toHaveAttr('id', attributeHash.id);
      expect(componentIdentifier).toHaveCss(attributeHash.style);
    });
  });
}

export const reactCompPropagatesAttrs = (renderedComp, class_name, id, style) => {
  it('adds classname, id, style to the component', () => {
    const component = ReactTestUtils.findRenderedDOMComponentWithClass(renderedComp, class_name);

    expect(component).not.toBeNull();
    expect(component.hasAttribute('id')).toBe(true);
    expect(component.getAttribute('id')).toEqual(id);
    Object.keys(style).map(key => {expect(component.style.key).toEqual(style[{key}]);});
  });
};