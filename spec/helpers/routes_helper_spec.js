import '../spec_helper';
import RoutesHelper from '../../src/helpers/routes_helper';
import MarkdownFileHelper from '../../src/helpers/markdown_file_helper';

describe('RoutesHelper', () => {
  let result, json1, json2, processor, requireFunc;

  describe('#getRoutes', () => {
    beforeEach(() => {
      processor = {};
      json1 = {a: 1, b: 2};
      json2 = {c: 3, d: 4};
      spyOn(MarkdownFileHelper, 'getRoute').and.callThrough();
      spyOn(MarkdownFileHelper, 'getTabHeaderIndex').and.callFake(file => file === './parent1/file1.md' ? 1 : 2);
      spyOn(MarkdownFileHelper, 'getPageTitle').and.callThrough();
      spyOn(MarkdownFileHelper, 'getParentTitle').and.callThrough();
      spyOn(MarkdownFileHelper, 'process').and.callFake(({json}) => ({processed: json}));
      requireFunc = jasmine.createSpy('requireFunc').and.callFake(file => file === './parent1/file1.md' ? json1 : json2);
      requireFunc.keys = jasmine.createSpy('keys').and.returnValue(['./parent1/file1.md', './parent2/file2.md']);
      result = RoutesHelper.getRoutes({requireFunc, processor});
    });

    it('requires each file', () => {
      expect(requireFunc).toHaveBeenCalledWith('./parent1/file1.md');
      expect(requireFunc).toHaveBeenCalledWith('./parent2/file2.md');
    });

    it('gets the route for each file', () => {
      expect(MarkdownFileHelper.getRoute).toHaveBeenCalledWith('./parent1/file1.md');
      expect(MarkdownFileHelper.getRoute).toHaveBeenCalledWith('./parent2/file2.md');
    });

    it('gets the tab header index for each file', () => {
      expect(MarkdownFileHelper.getTabHeaderIndex).toHaveBeenCalledWith('./parent1/file1.md');
      expect(MarkdownFileHelper.getTabHeaderIndex).toHaveBeenCalledWith('./parent2/file2.md');
    });

    it('gets the page title for each file', () => {
      expect(MarkdownFileHelper.getPageTitle).toHaveBeenCalledWith('./parent1/file1.md');
      expect(MarkdownFileHelper.getPageTitle).toHaveBeenCalledWith('./parent2/file2.md');
    });

    it('gets the parent title for each file', () => {
      expect(MarkdownFileHelper.getParentTitle).toHaveBeenCalledWith('./parent1/file1.md');
      expect(MarkdownFileHelper.getParentTitle).toHaveBeenCalledWith('./parent2/file2.md');
    });

    it('processes each file', () => {
      expect(MarkdownFileHelper.process).toHaveBeenCalledWith({json: json1, processor});
      expect(MarkdownFileHelper.process).toHaveBeenCalledWith({json: json2, processor});
    });

    it('returns route content by route', () => {
      expect(result).toEqual({
        '/parent1/file1': {
          file: './parent1/file1.md',
          route: '/parent1/file1',
          pageContent: {processed: json1},
          tabHeaderIndex: 1,
          pageTitle: 'file1',
          parentTitle: 'parent1'
        },
        '/parent2/file2': {
          file: './parent2/file2.md',
          route: '/parent2/file2',
          pageContent: {processed: json2},
          tabHeaderIndex: 2,
          pageTitle: 'file2',
          parentTitle: 'parent2'
        }
      });
    });
  });
});