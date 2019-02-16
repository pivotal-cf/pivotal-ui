import MarkdownFileHelper from '../../src/helpers/markdown_file_helper';

describe('MarkdownFileHelper', () => {
  let result, file;

  beforeEach(() => {
    file = './components/2.hello_world/1.Usage_and_examples.md';
  });

  describe('#process', () => {
    let json, processor;

    beforeEach(() => {
      json = {a: 1, b: 2};
      processor = {
        runSync: jest.fn(() => 'runSyncOutput'),
        stringify: jest.fn(() => 'stringifyOutput')
      };
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

    it('strips the numbers, leading dots, and trailing .md file extension from the route', () => {
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

    describe('when the file is numbered', () => {
      beforeEach(() => {
        result = MarkdownFileHelper.getParentTitle('./1.Get_Started/4.Unit_testing_with_Jasmine.md');
      });

      it('strips the number from the title', () => {
        expect(result).toBe('Get Started');
      });
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
      expect(result).toBe('info');
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

  describe('#getText', () => {
    it('combines text nodes into a single string', () => {
      expect(MarkdownFileHelper.getText({
        children: [
          {type: 'text', value: 'This is some text with '},
          {type: 'inlineCode', value: 'inline code in it'},
          {
            type: 'paragraph', children: [
              {type: 'text', value: 'some text in a paragraph'},
              {type: 'text', value: 'and some more text'}
            ]
          }
        ]
      })).toBe('This is some text with inline code in it some text in a paragraph and some more text');
    });

    it('handles headings', () => {
      expect(MarkdownFileHelper.getText({
        children: [
          {type: 'text', value: 'some text before'},
          {type: 'heading', children: [{type: 'text', value: 'heading text'}]},
          {type: 'text', value: 'some text after'}
        ]
      })).toBe('some text before heading text some text after');
    });

    it('handles text nodes in tables', () => {
      expect(MarkdownFileHelper.getText({
        children: [{
          type: 'table', children: [{
            type: 'tableRow', children: [
              {type: 'tableCell', children: [{type: 'text', value: 'cell one'}]},
              {type: 'tableCell', children: [{type: 'text', value: 'cell two'}]}
            ]
          }, {
            type: 'tableRow', children: [
              {type: 'tableCell', children: [{type: 'text', value: 'cell three'}]},
              {type: 'tableCell', children: [{type: 'text', value: 'cell four'}]}
            ]
          }]
        }]
      })).toBe('cell one cell two cell three cell four');
    });

    it('excludes content of code blocks', () => {
      expect(MarkdownFileHelper.getText({
        children: [
          {type: 'text', value: 'some text before'},
          {type: 'code', value: 'some code'},
          {type: 'text', value: 'some text after'}
        ]
      })).toBe('some text before some text after');
    });
  });
});