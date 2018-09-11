import MarkdownFileHelper from './markdown_file_helper';

export const getRoutes = ({requireFunc, processor}) => requireFunc.keys().reduce((memo, file) => {
  const json = requireFunc(file);
  const route = MarkdownFileHelper.getRoute(file);
  const tabHeaderIndex = MarkdownFileHelper.getTabHeaderIndex(file);
  const pageTitle = MarkdownFileHelper.getPageTitle(file);
  const parentTitle = MarkdownFileHelper.getParentTitle(file);
  const category = MarkdownFileHelper.getCategory(file);
  const text = MarkdownFileHelper.getText(json);
  const pageContent = MarkdownFileHelper.process({processor, json});

  return {...memo, [route]: {file, route, pageContent, tabHeaderIndex, pageTitle, parentTitle, category, text}};
}, {});
