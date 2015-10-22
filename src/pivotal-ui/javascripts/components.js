import selectFancy from 'pui-react-select-fancy';
import autocomplete from 'pui-react-autocomplete';
import TileLayout from 'pui-react-tile-layout';

module.exports = {
  DefaultH1: require('pui-react-typography').DefaultH1,
  DefaultH2: require('pui-react-typography').DefaultH2,
  DefaultH3: require('pui-react-typography').DefaultH3,
  DefaultH4: require('pui-react-typography').DefaultH4,
  DefaultH5: require('pui-react-typography').DefaultH5,
  DefaultH6: require('pui-react-typography').DefaultH6,

  AlternateH1: require('pui-react-typography').AlternateH1,
  AlternateH2: require('pui-react-typography').AlternateH2,
  AlternateH3: require('pui-react-typography').AlternateH3,
  AlternateH4: require('pui-react-typography').AlternateH4,
  AlternateH5: require('pui-react-typography').AlternateH5,
  AlternateH6: require('pui-react-typography').AlternateH6,

  MarketingH1: require('pui-react-typography').MarketingH1,
  MarketingH2: require('pui-react-typography').MarketingH2,
  MarketingH3: require('pui-react-typography').MarketingH3,
  MarketingH4: require('pui-react-typography').MarketingH4,
  MarketingH5: require('pui-react-typography').MarketingH5,
  MarketingH6: require('pui-react-typography').MarketingH6,

  Heading: require('pui-react-typography').Heading,

  BasePane: require('pui-react-panes').BasePane,
  Pane: require('pui-react-panes').Pane,

  UIButton: require('pui-react-buttons').UIButton,
  DefaultButton: require('pui-react-buttons').DefaultButton,
  DefaultAltButton: require('pui-react-buttons').DefaultAltButton,
  LowlightButton: require('pui-react-buttons').LowlightButton,
  DangerButton: require('pui-react-buttons').DangerButton,
  HighlightButton: require('pui-react-buttons').HighlightButton,
  HighlightAltButton: require('pui-react-buttons').HighlightAltButton,

  SearchInput: require('pui-react-search-input').SearchInput,

  Divider: require('pui-react-dividers').Divider,
  InverseDivider: require('pui-react-dividers').InverseDivider,

  Row: require('pui-react-grids').Row,
  Col: require('pui-react-grids').Col,

  Media: require('pui-react-media').Media,
  Flag: require('pui-react-media').Flag,

  Radio: require('pui-react-radio').Radio,
  RadioGroup: require('pui-react-radio-group').RadioGroup,

  Panel: require('pui-react-panels').Panel,
  SimplePanel: require('pui-react-panels').SimplePanel,
  ClickablePanel: require('pui-react-panels').ClickablePanel,
  ClickableAltPanel: require('pui-react-panels').ClickableAltPanel,
  BasicPanel: require('pui-react-panels').BasicPanel,
  BasicPanelAlt: require('pui-react-panels').BasicPanelAlt,
  ShadowPanel: require('pui-react-panels').ShadowPanel,
  HighlightPanel: require('pui-react-panels').HighlightPanel,

  Image: require('pui-react-images').Image,

  Icon: require('pui-react-iconography').Icon,

  Modal: require('pui-react-modals').Modal,
  BaseModal: require('pui-react-modals').BaseModal,
  ModalBody: require('pui-react-modals').ModalBody,
  ModalFooter: require('pui-react-modals').ModalFooter,

  Ribbon: require('pui-react-ribbons').Ribbon,
  PrimaryRibbon: require('pui-react-ribbons').PrimaryRibbon,
  Banner: require('pui-react-ribbons').Banner,

  Tab: require('pui-react-tabs').Tab,
  SimpleTabs: require('pui-react-tabs').SimpleTabs,
  SimpleAltTabs: require('pui-react-tabs').SimpleAltTabs,
  LeftTabs: require('pui-react-tabs').LeftTabs,

  UnorderedList: require('pui-react-lists').UnorderedList,
  OrderedList: require('pui-react-lists').OrderedList,
  InlineList: require('pui-react-lists').InlineList,
  GroupList: require('pui-react-lists').GroupList,
  GroupListInverse: require('pui-react-lists').GroupListInverse,
  StepList: require('pui-react-lists').StepList,
  BreadcrumbList: require('pui-react-lists').BreadcrumbList,
  ListItem: require('pui-react-lists').ListItem,
  DraggableList: require('pui-react-draggable-list').DraggableList,
  DraggableListItem: require('pui-react-draggable-list').DraggableListItem,

  Dropdown: require('pui-react-dropdowns').Dropdown,
  DropdownItem: require('pui-react-dropdowns').DropdownItem,
  LinkDropdown: require('pui-react-dropdowns').LinkDropdown,
  DefaultAltDropdown: require('pui-react-dropdowns').DefaultAltDropdown,
  DangerDropdown: require('pui-react-dropdowns').DangerDropdown,
  HighlightAltDropdown: require('pui-react-dropdowns').HighlightAltDropdown,
  HighlightDropdown: require('pui-react-dropdowns').HighlightDropdown,
  LowlightDropdown: require('pui-react-dropdowns').LowlightDropdown,

  Notifications: require('pui-react-notifications').Notifications,
  AlertNotifications: require('pui-react-notifications').AlertNotifications,
  NotificationItem: require('pui-react-notifications').NotificationItem,

  Label: require('pui-react-labels').Label,
  BaseCollapse: require('pui-react-collapse').BaseCollapse,
  Collapse: require('pui-react-collapse').Collapse,
  AltCollapse: require('pui-react-collapse').AltCollapse,

  ExpanderContent: require('pui-react-expander').ExpanderContent,
  ExpanderTrigger: require('pui-react-expander').ExpanderTrigger,

  SuccessAlert: require('pui-react-alerts').SuccessAlert,
  InfoAlert: require('pui-react-alerts').InfoAlert,
  WarningAlert: require('pui-react-alerts').WarningAlert,
  ErrorAlert: require('pui-react-alerts').ErrorAlert,

  OverlayTrigger: require('pui-react-overlay-trigger').OverlayTrigger,
  Tooltip: require('pui-react-tooltip').Tooltip,

  BackToTop: require('pui-react-back-to-top').BackToTop,

  PortalSource: require('pui-react-portals').PortalSource,
  PortalDestination: require('pui-react-portals').PortalDestination,
  StreamList: require('pui-react-stream-list').StreamList,
  StreamListItem: require('pui-react-stream-list').StreamListItem,
  SortableTable: require('pui-react-sortable-table').SortableTable,
  TableHeader: require('pui-react-sortable-table').TableHeader,
  TableCell: require('pui-react-sortable-table').TableCell,
  TableRow: require('pui-react-sortable-table').TableRow,
  ...autocomplete,
  ...selectFancy,
  TileLayout: TileLayout};
