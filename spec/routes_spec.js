import './spec_helper';
import routes, {getRouteContent, routeData} from '../src/routes';

describe('Routes', () => {
  it('exports routes', () => {
    expect(typeof routes).toBe('object');
  });

  Object.keys(routes).forEach(route => {
    it(`has route data for ${route}`, () => {
      expect(routes[route]).toEqual({
        file: jasmine.stringMatching(/\.md$/),
        route: jasmine.any(String),
        pageMetadata: jasmine.objectContaining({
          title: jasmine.any(String),
          menu: jasmine.any(String),
          route: jasmine.anything()
        }),
        pageSections: jasmine.any(Array)
      });
    });
  });

  describe('getRouteContent', () => {
    describe('for top-level routes', () => {
      Object.keys(routes).forEach(route => {
        it(`returns route data for ${route}`, () => {
          expect(getRouteContent(route)).toEqual(routes[route]);
        });
      });
    });

    describe('for nested routes', () => {
      Object.keys(routes).filter(route => route !== '/').forEach(route => {
        const {pageSections} = routes[route];
        pageSections.forEach(section => {
          it(`returns top-level route data for ${section.route}`, () => {
            expect(getRouteContent(section.route)).toEqual(routes[route]);
          });
        });
      });
    });

    describe('for the default route', () => {
      const {pageSections} = routes['/'];
      pageSections.forEach(section => {
        it(`returns top-level route data for ${section.route}`, () => {
          expect(getRouteContent(section.route)).toEqual(routes['/get-started']);
        });
      });
    });

    describe('for an invalid route', () => {
      let route;

      beforeEach(() => {
        route = '/some-definitely-invalid-route';
      });

      it('returns 404 route data', () => {
        expect(getRouteContent(route)).toEqual(routes['/404']);
      });
    });
  });

  describe('routeData', () => {
    it('contains all route data', () => {
      expect(Object.values(routes).every(routeContent => routeData.indexOf(routeContent) > -1)).toBeTruthy();
    });
  });
});