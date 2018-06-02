import markdownFileToComponent from './helpers/markdown_to_component';

const pages = {
  '': 'GetStarted.md',
  getstarted: 'GetStarted.md',
  'index.html': 'GetStarted.md',
  faq: 'Faq.md',
  upgradeguide: 'UpgradeGuide.md',
  versions: 'Versions.md',
  contribute: 'Contribute.md',
  404: '404.md'
};

const components = {
  alerts: 'components/Alerts.md',
  autocomplete: 'components/Autocomplete.md',
  backtotop: 'components/BackToTop.md',
  buttongroup: 'components/ButtonGroup.md',
  buttons: 'components/Buttons.md',
  checkboxdropdown: 'components/CheckboxDropdowns.md',
  checkboxes: 'components/Checkboxes.md',
  code: 'components/Code.md',
  collapse: 'components/Collapse.md',
  collapsible: 'components/Collapsible.md',
  copytoclipboard: 'components/CopyToClipboard.md',
  dividers: 'components/Dividers.md',
  dropdowns: 'components/Dropdowns.md',
  expander: 'components/Expander.md',
  flyout: 'components/Flyout.md',
  forms: 'components/Forms.md',
  grids: 'components/Grids.md',
  icons: 'components/Icons.md',
  images: 'components/Images.md',
  inputs: 'components/Inputs.md',
  lists: 'components/Lists.md',
  media: 'components/Media.md',
  modal: 'components/Modal.md',
  notifications: 'components/Notifications.md',
  pagination: 'components/Pagination.md',
  panels: 'components/Panels.md',
  portals: 'components/Portals.md',
  progressbars: 'components/ProgressBar.md',
  radios: 'components/Radios.md',
  select: 'components/Select.md',
  svg: 'components/Svg.md',
  tables: 'components/Tables.md',
  tabs: 'components/Tabs.md',
  textfilter: 'components/TextFilter.md',
  toggle: 'components/Toggle.md',
  tooltips: 'components/Tooltips.md',
  wizard: 'components/Wizard.md'
};

const modifiers = {
  alignment: 'modifiers/Alignment.md',
  border: 'modifiers/Border.md',
  boxshadows: 'modifiers/BoxShadows.md',
  colors: 'modifiers/Colors.md',
  ellipsis: 'modifiers/Ellipsis.md',
  links: 'modifiers/Links.md',
  positioning: 'modifiers/Positioning.md',
  typography: 'modifiers/Typography.md',
  verticalalignment: 'modifiers/VerticalAlignment.md',
  whitespace: 'modifiers/Whitespace.md'
};

const routes = Object.entries({...pages, ...components, ...modifiers}).reduce((memo, [route, file]) => {
  const category = components[route] ? 'component' : modifiers[route] ? 'modifier' : 'page';
  const {pageMetadata, PageComponent} = markdownFileToComponent(file, category);
  return {...memo, [route]: {file, category, href: route, pageMetadata, PageComponent}};
}, {});

export default routes;