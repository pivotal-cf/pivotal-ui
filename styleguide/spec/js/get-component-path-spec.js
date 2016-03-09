require('./spec_helper');

import getComponentPath from '../../src/get-component-path';

describe('getComponentPath', () => {
  it('splits stuff', () => {
    const path = getComponentPath('/css_hamster_beignet.html');
    expect(path.language).toEqual('css');
  });

  it('returns react base as default', () => {
    const path = getComponentPath('/woooooooooooo.html');
    expect(path.language).toEqual('react');
  });

  it('returns the correct language for "all" pages', () => {
    const path = getComponentPath('/css_all.html');
    expect(path.language).toEqual('css');
  });
});
