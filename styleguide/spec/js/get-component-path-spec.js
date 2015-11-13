import getComponentPath from '../../src/get-component-path';

describe('getComponentPath', () => {
  it('splits stuff', () => {
    const path = getComponentPath('/css_hamster_beignet.html');
    expect(path.language).toEqual('css');
    expect(path.componentType).toEqual('hamster');
  });

  it('returns react base as default', () => {
    const path = getComponentPath('/woooooooooooo.html');
    expect(path.language).toEqual('react');
    expect(path.componentType).toEqual('base');
  });
});
