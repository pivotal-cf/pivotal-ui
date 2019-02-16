import * as RoutesHelper from '../../src/helpers/routes_helper';
import MarkdownFileHelper from '../../src/helpers/markdown_file_helper';

describe('RoutesHelper', () => {
  let result, json1, json2, processor, requireFunc;

  describe('#getRoutes', () => {
    beforeEach(() => {
      processor = {};
      json1 = {a: 1, b: 2};
      json2 = {c: 3, d: 4};
      jest.spyOn(MarkdownFileHelper, 'getRoute').mockImplementation(file => file === './parent1/file1.md' ? '/parent1/file1' : '/components/parent2/file2');
      jest.spyOn(MarkdownFileHelper, 'getTabHeaderIndex').mockImplementation(file => file === './parent1/file1.md' ? 1 : 2);
      jest.spyOn(MarkdownFileHelper, 'getPageTitle');
      jest.spyOn(MarkdownFileHelper, 'getParentTitle');
      jest.spyOn(MarkdownFileHelper, 'getCategory');
      jest.spyOn(MarkdownFileHelper, 'getText').mockImplementation(() => 'All page text');
      jest.spyOn(MarkdownFileHelper, 'process').mockImplementation(({json}) => ({processed: json}));
      jest.spyOn(MarkdownFileHelper, 'getMetadata').mockImplementation(() => ({meta: 'data'}));
      requireFunc = jest.fn(file => file === './parent1/file1.md' ? json1 : json2);
      requireFunc.keys = jest.fn().mockReturnValue(['./parent1/file1.md', './components/parent2/file2.md']);
      result = RoutesHelper.getRoutes({requireFunc, processor});
    });

    it('requires each file', () => {
      expect(requireFunc).toHaveBeenCalledWith('./parent1/file1.md');
      expect(requireFunc).toHaveBeenCalledWith('./components/parent2/file2.md');
    });

    it('gets the route for each file', () => {
      expect(MarkdownFileHelper.getRoute).toHaveBeenCalledWith('./parent1/file1.md');
      expect(MarkdownFileHelper.getRoute).toHaveBeenCalledWith('./components/parent2/file2.md');
    });

    it('gets the tab header index for each file', () => {
      expect(MarkdownFileHelper.getTabHeaderIndex).toHaveBeenCalledWith('./parent1/file1.md');
      expect(MarkdownFileHelper.getTabHeaderIndex).toHaveBeenCalledWith('./components/parent2/file2.md');
    });

    it('gets the page title for each file', () => {
      expect(MarkdownFileHelper.getPageTitle).toHaveBeenCalledWith('./parent1/file1.md');
      expect(MarkdownFileHelper.getPageTitle).toHaveBeenCalledWith('./components/parent2/file2.md');
    });

    it('gets the parent title for each file', () => {
      expect(MarkdownFileHelper.getParentTitle).toHaveBeenCalledWith('./parent1/file1.md');
      expect(MarkdownFileHelper.getParentTitle).toHaveBeenCalledWith('./components/parent2/file2.md');
    });

    it('gets the category for each file', () => {
      expect(MarkdownFileHelper.getCategory).toHaveBeenCalledWith('./parent1/file1.md');
      expect(MarkdownFileHelper.getCategory).toHaveBeenCalledWith('./components/parent2/file2.md');
    });

    it('gets the metadata for each file', () => {
      expect(MarkdownFileHelper.getMetadata).toHaveBeenCalledWith(json1);
      expect(MarkdownFileHelper.getMetadata).toHaveBeenCalledWith(json2);
    });

    it('processes each file', () => {
      expect(MarkdownFileHelper.process).toHaveBeenCalledWith({json: json1, processor});
      expect(MarkdownFileHelper.process).toHaveBeenCalledWith({json: json2, processor});
    });

    it('returns route content by route', () => {
      expect(result).toEqual({
        '/parent1/file1': {
          file: './parent1/file1.md',
          metadata: {meta: 'data'},
          route: '/parent1/file1',
          pageContent: {processed: json1},
          tabHeaderIndex: 1,
          pageTitle: 'file1',
          parentTitle: 'parent1',
          category: 'info',
          text: 'All page text'
        },
        '/components/parent2/file2': {
          file: './components/parent2/file2.md',
          metadata: {meta: 'data'},
          route: '/components/parent2/file2',
          pageContent: {processed: json2},
          tabHeaderIndex: 2,
          pageTitle: 'file2',
          parentTitle: 'parent2',
          category: 'components',
          text: 'All page text'
        }
      });
    });
  });
});