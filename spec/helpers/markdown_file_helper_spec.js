import '../spec_helper';
import MarkdownFileHelper from '../../src/helpers/markdown_file_helper';

fdescribe('MarkdownFileHelper', () => {
  let result, file;

  beforeEach(() => {
    file = './components/hello-world/1.Usage-and-examples.md';
  });

  describe('#process', () => {
    let json, processor;

    beforeEach(() => {
      json = {a: 1, b: 2};
      processor = jasmine.createSpyObj('processor', ['runSync', 'stringify']);
      processor.runSync.and.returnValue('runSyncOutput');
      processor.stringify.and.returnValue('stringifyOutput');
      result = MarkdownFileHelper.process({processor, json});
    });

    it('processes the JSON', () => {
      expect(processor.runSync).toHaveBeenCalledWith(json);
    });

    it('stringifies the output', () => {
      expect(processor.stringify).toHaveBeenCalledWith('runSyncOutput');
    });

    it('returns the stringified output', () => {
      expect(result).toBe('stringifyOutput');
    });
  });

  describe('#getRoute', () => {
    beforeEach(() => {
      result = MarkdownFileHelper.getRoute(file);
    });

    it('returns the route', () => {
      expect(result).toBe('/components/hello-world/usage-and-examples');
    });
  });

  describe('#getTabHeaderIndex', () => {
    describe('when the tab index is a single-digit number', () => {
      beforeEach(() => {
        file = './components/hello-world/3.Usage-and-examples.md';
        result = MarkdownFileHelper.getTabHeaderIndex(file);
      });

      it('returns the tab header index', () => {
        expect(result).toBe(3);
      });
    });

    describe('when the tab index is a multiple-digit number', () => {
      beforeEach(() => {
        file = './components/hello-world/10.Usage-and-examples.md';
        result = MarkdownFileHelper.getTabHeaderIndex(file);
      });

      it('returns the tab header index', () => {
        expect(result).toBe(10);
      });
    });

    describe('when the tab index is a not number', () => {
      beforeEach(() => {
        file = './components/hello-world/three.Usage-and-examples.md';
        result = MarkdownFileHelper.getTabHeaderIndex(file);
      });

      it('returns the tab header index', () => {
        expect(result).toBe(-1);
      });
    });

    describe('when there is no period in the filename', () => {
      beforeEach(() => {
        file = './components/hello-world/foo.md';
        result = MarkdownFileHelper.getTabHeaderIndex(file);
      });

      it('returns the tab header index', () => {
        expect(result).toBe(-1);
      });
    });
  });

  describe('#getParentTitle', () => {
    beforeEach(() => {
      result = MarkdownFileHelper.getParentTitle('./components/Hello-world-FOO/1.Usage-and-examples.md');
    });

    it('returns the parent title', () => {
      expect(result).toBe('Hello world FOO');
    });
  });

  describe('#getPageTitle', () => {
    beforeEach(() => {
      result = MarkdownFileHelper.getPageTitle(file);
    });

    it('returns the page title', () => {
      expect(result).toBe('Usage and examples');
    });
  });

  describe('#getTabRoutes', () => {
    let currentRoute, routes;

    beforeEach(() => {
      currentRoute = '/components/hello-world/tab-four';

      routes = {
        '/components/hello-world/tab-one': {
          tabHeaderIndex: 1,
          file: './components/hello-world/1.Tab-one.md',
          route: '/components/hello-world/tab-one',
          pageContent: {}
        },
        '/components/hello-world/tab-five': {
          tabHeaderIndex: 5,
          file: './components/hello-world/5.Tab-five.md',
          route: '/components/hello-world/tab-five',
          pageContent: {}
        },
        '/components/hello-world/tab-four': {
          tabHeaderIndex: 4,
          file: './components/hello-world/4.Tab-four.md',
          route: '/components/hello-world/tab-four',
          pageContent: {}
        },
        '/components/hello-world/tab-two': {
          tabHeaderIndex: 2,
          file: './components/hello-world/2.Tab-two.md',
          route: '/components/hello-world/tab-two',
          pageContent: {}
        },
        '/components/hello-world/tab-three': {
          tabHeaderIndex: 3,
          file: './components/hello-world/3.Tab-three.md',
          route: '/components/hello-world/tab-three',
          pageContent: {}
        }
      };

      result = MarkdownFileHelper.getTabRoutes(routes, currentRoute);
    });

    it('returns the tab routes for the given file', () => {
      expect(result).toEqual([
        '/components/hello-world/tab-one',
        '/components/hello-world/tab-two',
        '/components/hello-world/tab-three',
        '/components/hello-world/tab-four',
        '/components/hello-world/tab-five'
      ]);
    });
  });
});