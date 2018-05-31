import {markdownFileToComponent} from './helpers/markdown_helper';

const getStartedRoute = {file: 'GetStarted.md', name: 'Get Started'};

const pages = {
  '': getStartedRoute,
  getstarted: getStartedRoute,
  'index.html': getStartedRoute,
  faq: {file: 'Faq.md', name: 'FAQ'},
  upgradeguide: {file: 'UpgradeGuide.md', name: 'Upgrade Guide'},
  versions: {file: 'Versions.md', name: 'Versions'},
  contribute: {file: 'Contribute.md', name: 'Contribute'},
  404: {file: '404.md', name: '404 Not Found'}
};

const components = {
  alerts: {file: 'components/Alerts.md', name: 'Alerts'},
  autocomplete: {file: 'components/Autocomplete.md', name: 'Autocomplete'},
  back_to_top: {file: 'components/BackToTop.md', name: 'Back To Top'},
  button_group: {file: 'components/ButtonGroup.md', name: 'Button Group'},
  buttons: {file: 'components/Buttons.md', name: 'Buttons'},
  checkbox_dropdown: {file: 'components/CheckboxDropdowns.md', name: 'Checkbox Dropdown'},
  checkboxes: {file: 'components/Checkboxes.md', name: 'Checkboxes', reactPath: 'pivotal-ui/react/checkbox'},
  code: {file: 'components/Code.md', name: 'Code'},
  collapse: {file: 'components/Collapse.md', name: 'Collapse'},
  collapsible: {file: 'components/Collapsible.md', name: 'Collapsible'},
  copy_to_clipboard: {file: 'components/CopyToClipboard.md', name: 'CopyToClipboard'},
  dividers: {file: 'components/Dividers.md', name: 'Dividers'},
  dropdowns: {file: 'components/Dropdowns.md', name: 'Dropdowns'},
  ellipsis: {file: 'components/Ellipsis.md', name: 'Ellipsis'},
  expander: {file: 'components/Expander.md', name: 'Expander'},
  flyout: {file: 'components/Flyout.md', name: 'Flyout'},
  forms: {file: 'components/Forms.md', name: 'Forms'},
  grids: {file: 'components/Grids.md', name: 'Grids'},
  icons: {file: 'components/Icons.md', name: 'Icons'},
  images: {file: 'components/Images.md', name: 'Images'},
  inputs: {file: 'components/Inputs.md', name: 'Inputs'},
  lists: {file: 'components/Lists.md', name: 'Lists'},
  media: {file: 'components/Media.md', name: 'Media'},
  modal: {file: 'components/Modal.md', name: 'Modal'},
  notifications: {file: 'components/Notifications.md', name: 'Notifications'},
  pagination: {file: 'components/Pagination.md', name: 'Pagination'},
  panels: {file: 'components/Panels.md', name: 'Panels'},
  portals: {file: 'components/Portals.md', name: 'Portals'},
  positioning: {file: 'components/Positioning.md', name: 'Positioning'},
  progress_bars: {file: 'components/ProgressBar.md', name: 'Progress Bars'},
  radios: {file: 'components/Radios.md', name: 'Radio'},
  select: {file: 'components/Select.md', name: 'Select'},
  svg: {file: 'components/Svg.md', name: 'Svg'},
  tables: {file: 'components/Tables.md', name: 'Tables'},
  tabs: {file: 'components/Tabs.md', name: 'Tabs'},
  text_filter: {file: 'components/TextFilter.md', name: 'TextFilter'},
  toggle: {file: 'components/Toggles.md', name: 'Toggles'},
  tooltips: {file: 'components/Tooltips.md', name: 'Tooltips'},
  wizard: {file: 'components/Wizard.md', name: 'Wizard'}
};

const modifiers = {
  alignment: {file: 'modifiers/Alignment.md', name: 'Alignment'},
  border: {file: 'modifiers/Border.md', name: 'Border'},
  box_shadows: {file: 'modifiers/BoxShadows.md', name: 'Box Shadows'},
  colors: {file: 'modifiers/Colors.md', name: 'Colors'},
  ellipsis: {file: 'modifiers/Ellipsis.md', name: 'Ellipsis'},
  links: {file: 'modifiers/Links.md', name: 'Links'},
  positioning: {file: 'modifiers/Positioning.md', name: 'Positioning'},
  typography: {file: 'modifiers/Typography.md', name: 'Typography'},
  vertical_alignment: {file: 'modifiers/VerticalAlignment.md', name: 'Vertical Alignment'},
  whitespace: {file: 'modifiers/Whitespace.md', name: 'Whitespace'}
};

const routes = Object.entries({...pages, ...components, ...modifiers}).reduce((memo, [route, routeData]) => {
  const {file, name, reactPath, cssPath} = routeData;
  const PageComponent = markdownFileToComponent({file, name});
  const ReactComponents = reactPath && require(reactPath);
console.log({file, ReactComponents})

  return {...memo, [route]: {
    ...routeData,
    PageComponent,
    ReactComponents
  }}
}, {});

export {pages, components, modifiers, routes};