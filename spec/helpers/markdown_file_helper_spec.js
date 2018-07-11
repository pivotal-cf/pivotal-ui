import '../spec_helper';
import MarkdownFileHelper from '../../src/helpers/markdown_file_helper';

describe('MarkdownFileHelper', () => {
  let result, file;

  beforeEach(() => {
    file = './components/hello_world/1.Usage_and_examples.md';
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
      expect(result).toBe('/components/hello_world/usage_and_examples');
    });
  });

  describe('#getTabHeaderIndex', () => {
    describe('when the tab index is a single digit number', () => {
      beforeEach(() => {
        file = './components/hello_world/3.Usage_and_examples.md';
        result = MarkdownFileHelper.getTabHeaderIndex(file);
      });

      it('returns the tab header index', () => {
        expect(result).toBe(3);
      });
    });

    describe('when the tab index is a multiple digit number', () => {
      beforeEach(() => {
        file = './components/hello_world/10.Usage_and_examples.md';
        result = MarkdownFileHelper.getTabHeaderIndex(file);
      });

      it('returns the tab header index', () => {
        expect(result).toBe(10);
      });
    });

    describe('when the tab index is a negative number', () => {
      beforeEach(() => {
        file = './components/hello_world/-10.Usage_and_examples.md';
        result = MarkdownFileHelper.getTabHeaderIndex(file);
      });

      it('returns the tab header index', () => {
        expect(result).toBe(-10);
      });
    });

    describe('when the tab index is a not number', () => {
      beforeEach(() => {
        file = './components/hello_world/three.Usage_and_examples.md';
        result = MarkdownFileHelper.getTabHeaderIndex(file);
      });

      it('returns the tab header index', () => {
        expect(result).toBe(-1);
      });
    });

    describe('when there is no period in the filename', () => {
      beforeEach(() => {
        file = './components/hello_world/foo.md';
        result = MarkdownFileHelper.getTabHeaderIndex(file);
      });

      it('returns the tab header index', () => {
        expect(result).toBe(-1);
      });
    });
  });

  describe('#getParentTitle', () => {
    beforeEach(() => {
      result = MarkdownFileHelper.getParentTitle('./components/Hello_world_FOO/1.Usage_and_examples.md');
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
      currentRoute = '/components/hello_world/tab_four';

      routes = {
        '/components/hello_world/tab_one': {
          tabHeaderIndex: 1,
          file: './components/hello_world/1.Tab_one.md',
          route: '/components/hello_world/tab_one',
          pageContent: {}
        },
        '/components/hello_world/tab_five': {
          tabHeaderIndex: 5,
          file: './components/hello_world/5.Tab_five.md',
          route: '/components/hello_world/tab_five',
          pageContent: {}
        },
        '/components/hello_world/tab_four': {
          tabHeaderIndex: 4,
          file: './components/hello_world/4.Tab_four.md',
          route: '/components/hello_world/tab_four',
          pageContent: {}
        },
        '/components/hello_world/tab_two': {
          tabHeaderIndex: 2,
          file: './components/hello_world/2.Tab_two.md',
          route: '/components/hello_world/tab_two',
          pageContent: {}
        },
        '/components/hello_world/tab_three': {
          tabHeaderIndex: 3,
          file: './components/hello_world/3.Tab_three.md',
          route: '/components/hello_world/tab_three',
          pageContent: {}
        }
      };

      result = MarkdownFileHelper.getTabRoutes(routes, currentRoute);
    });

    it('returns the tab routes for the given file', () => {
      expect(result).toEqual([
        '/components/hello_world/tab_one',
        '/components/hello_world/tab_two',
        '/components/hello_world/tab_three',
        '/components/hello_world/tab_four',
        '/components/hello_world/tab_five'
      ]);
    });
  });

  describe('#getCategory', () => {
    beforeEach(() => {
      result = MarkdownFileHelper.getCategory('/get_started/installation');
    });

    it('returns info by default', () => {
      expect(result).toBe('info')
    });

    describe('when the file has a category', () => {
      beforeEach(() => {
        result = MarkdownFileHelper.getCategory(file);
      });

      it('returns the category', () => {
        expect(result).toBe('components');
      });
    });
  });
});